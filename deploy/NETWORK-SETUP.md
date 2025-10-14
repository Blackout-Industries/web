# Network Security Configuration
## UDM Pro Max + VLAN Isolation for Raspberry Pi

This guide configures a secure, isolated network segment for the Raspberry Pi web server using Ubiquiti Dream Machine Pro Max with zero-trust principles.

---

## Network Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     UDM Pro Max                              │
│                                                              │
│  ┌─────────────────┐   ┌──────────────────┐  ┌────────────┐│
│  │  WAN            │   │  Management      │  │  LAN       ││
│  │  (Internet)     │   │  VLAN 1          │  │  VLAN 10   ││
│  │                 │   │  192.168.1.0/24  │  │  10.0.10.0/│││
│  └────────┬────────┘   └────────┬─────────┘  └──────┬─────┘│
│           │                     │                    │      │
│           │            ┌────────▼─────────────────────▼───┐ │
│           │            │   Firewall Rules                 │ │
│           │            │   - Allow SSH: Management→DMZ    │ │
│           │            │   - Block: DMZ→Management       │ │
│           │            │   - Block: DMZ→LAN              │ │
│           │            │   - Allow: DMZ→WAN              │ │
│           │            └──────────────┬───────────────────┘ │
│           │                          │                      │
│           │                 ┌────────▼────────┐             │
│           └─────────────────┤  DMZ VLAN 99    │             │
│                             │  172.16.99.0/24 │             │
│                             └────────┬────────┘             │
└──────────────────────────────────────┼──────────────────────┘
                                       │
                           ┌───────────▼──────────┐
                           │  Raspberry Pi        │
                           │  172.16.99.10        │
                           │  ┌────────────────┐  │
                           │  │  Docker        │  │
                           │  │  - cloudflared │  │
                           │  │  - web app     │  │
                           │  └────────────────┘  │
                           └─────────────────────┘
```

**Security Zones:**
- **Management VLAN (VLAN 1)** - Your workstations, trusted devices
- **LAN VLAN (VLAN 10)** - Main home/office network
- **DMZ VLAN (VLAN 99)** - Isolated Raspberry Pi (zero trust)

**Traffic Flow:**
- ✅ Management → DMZ (SSH only, port 22)
- ✅ DMZ → Internet (Cloudflare Tunnel outbound)
- ❌ DMZ → Management (blocked)
- ❌ DMZ → LAN (blocked)
- ❌ LAN → DMZ (blocked)
- ❌ Internet → DMZ (no inbound, tunnel only)

---

## Step 1: Create DMZ VLAN

### Via UniFi Network Application

1. **Navigate to Settings → Networks**
2. **Click "Create New Network"**

**Configuration:**
```
Network Name: DMZ-WebServers
VLAN ID: 99
Gateway IP/Subnet: 172.16.99.1/24
DHCP Mode: DHCP Server
DHCP Range: 172.16.99.100 - 172.16.99.200
Domain Name: dmz.local
```

**Advanced Settings:**
- [x] IGMP Snooping: Disabled
- [x] Multicast DNS: Disabled
- [ ] Auto Scale Network: Disabled
- [x] IPv6: Disabled (unless needed)

3. **Click "Add Network"**

### Static IP for Raspberry Pi

**Option 1: DHCP Reservation**
- Navigate to: **Clients → Raspberry Pi → Configuration**
- Fixed IP Address: `172.16.99.10`
- Save

**Option 2: Static IP on Pi** (recommended)
```bash
# On Raspberry Pi
sudo nano /etc/dhcpcd.conf

# Add at the end:
interface eth0
static ip_address=172.16.99.10/24
static routers=172.16.99.1
static domain_name_servers=1.1.1.1 1.0.0.1
```

```bash
# Restart networking
sudo systemctl restart dhcpcd
```

---

## Step 2: Configure Firewall Rules

### Rule 1: Allow SSH from Management to DMZ

**Purpose:** Let you SSH to Raspberry Pi from your workstation

Navigate to: **Settings → Security → Firewall → Rules**

**LAN IN Rule:**
```
Name: Allow-SSH-Management-to-DMZ
Rule Applied: Before Predefined Rules
Action: Accept

Source:
  Type: Address/Port Group
  IPv4 Address Group: [Create group "Management-Devices"]
    - Add your workstation IPs (e.g., 192.168.1.100)

Destination:
  Type: Address/Port Group
  IPv4 Address Group: [Create group "DMZ-Servers"]
    - 172.16.99.10 (Raspberry Pi)

Port: 22
Protocol: TCP

States: All
```

### Rule 2: Block DMZ to Management

**Purpose:** Prevent compromised Pi from accessing your network

**LAN IN Rule:**
```
Name: Block-DMZ-to-Management
Rule Applied: Before Predefined Rules
Action: Drop

Source:
  Type: Network
  Network: DMZ-WebServers (172.16.99.0/24)

Destination:
  Type: Network
  Network: Management (192.168.1.0/24)

Port: Any
Protocol: All

Logging: Enabled (for security monitoring)
```

### Rule 3: Block DMZ to LAN

**Purpose:** Prevent DMZ from accessing main LAN

**LAN IN Rule:**
```
Name: Block-DMZ-to-LAN
Rule Applied: Before Predefined Rules
Action: Drop

Source:
  Type: Network
  Network: DMZ-WebServers (172.16.99.0/24)

Destination:
  Type: Network
  Network: LAN (10.0.10.0/24)  # Adjust to your LAN subnet

Port: Any
Protocol: All

Logging: Enabled
```

### Rule 4: Allow DMZ to Internet

**Purpose:** Pi needs outbound access for Cloudflare Tunnel + updates

**LAN OUT Rule:**
```
Name: Allow-DMZ-to-Internet
Rule Applied: Before Predefined Rules
Action: Accept

Source:
  Type: Network
  Network: DMZ-WebServers (172.16.99.0/24)

Destination:
  Type: Any

Port: Any
Protocol: All

Note: This is default behavior, but explicit rule for clarity
```

### Firewall Rule Order

**Critical:** Rules are processed top-to-bottom. Order should be:

1. `Allow-SSH-Management-to-DMZ` (most specific)
2. `Block-DMZ-to-Management`
3. `Block-DMZ-to-LAN`
4. `Allow-DMZ-to-Internet`
5. ... (other default rules)

---

## Step 3: Configure Switch Port

### Assign VLAN to Switch Port

If using UniFi switch:

1. **Navigate to: Devices → [Your Switch] → Ports**
2. **Find port where Raspberry Pi is connected** (e.g., Port 8)

**Port Configuration:**
```
Profile Overrides: Enable
Operation: Switching
Port Profile: Custom

VLAN Configuration:
  Native VLAN/Network: DMZ-WebServers (99)
  Tagged Networks: None (untagged DMZ only)

PoE: Off (Pi has its own power)
```

3. **Apply Changes**

The Raspberry Pi will now only have access to VLAN 99.

---

## Step 4: Test Network Isolation

### From Raspberry Pi (172.16.99.10)

```bash
# SSH to Pi
ssh pi@172.16.99.10

# Test internet connectivity (should work)
ping 1.1.1.1
# Expected: Success

# Test DNS resolution (should work)
ping google.com
# Expected: Success

# Test Cloudflare Tunnel connectivity
curl https://api.cloudflare.com/cdn-cgi/trace
# Expected: Success

# Try to reach Management VLAN (should fail)
ping 192.168.1.1
# Expected: No route to host OR timeout

# Try to reach LAN (should fail)
ping 10.0.10.1
# Expected: No route to host OR timeout

# Try to reach UDM gateway (should succeed for VLAN 99 only)
ping 172.16.99.1
# Expected: Success
```

### From Management Workstation (192.168.1.x)

```bash
# SSH to Pi (should work)
ssh pi@172.16.99.10
# Expected: Success

# From Pi, try to SSH back to workstation (should fail)
# On Pi:
ssh user@192.168.1.100
# Expected: Connection refused or timeout (firewall blocked)
```

---

## Step 5: Security Monitoring

### Enable Firewall Logging

In firewall rules where `Logging: Enabled`:
- Navigate to: **System Logs → Events**
- Filter by: `Firewall`

**Monitor for:**
- Blocked attempts from DMZ to Management/LAN
- Unexpected SSH attempts from unknown IPs
- High volume of dropped packets

### Setup Alerts (Optional)

**Settings → Alerts → Create Alert**

**Alert 1: DMZ Breach Attempt**
```
Name: DMZ-to-Management-Blocked
Event Type: Firewall Rule
Rule: Block-DMZ-to-Management
Threshold: > 10 events in 5 minutes
Action: Email notification
```

**Alert 2: SSH Brute Force**
```
Name: SSH-Brute-Force-DMZ
Event Type: Threat Management
Category: Intrusion Detection
Source: 172.16.99.0/24
Threshold: > 5 failed attempts in 1 minute
Action: Email + Push notification
```

---

## Step 6: Additional Hardening

### 1. Enable Threat Management (IPS)

**Settings → Security → Threat Management**

Enable for DMZ VLAN:
- [x] Intrusion Prevention System (IPS)
- [x] Intrusion Detection System (IDS)
- Country Blocking: Block countries you don't expect traffic from
- Honeypot: Enable (catch automated attacks)

### 2. Traffic Rules (Optional QoS)

Limit DMZ traffic if needed:

**Settings → Traffic Management → Traffic Rules**

```
Name: DMZ-Bandwidth-Limit
Networks: DMZ-WebServers
Download: 50 Mbps
Upload: 10 Mbps
```

(Adjust based on expected traffic - Cloudflare Tunnel uses minimal bandwidth)

### 3. mDNS/Bonjour Blocking

Ensure DMZ can't discover services on other VLANs:

**Settings → Networks → DMZ-WebServers → Advanced**
- [x] Multicast DNS: **Disabled**
- [x] IGMP Snooping: **Disabled**

### 4. IPv6 Firewall (if IPv6 enabled)

Create IPv6 equivalents of firewall rules:
- Block DMZ IPv6 range to Management/LAN
- Allow SSH from Management IPv6 to DMZ

---

## Step 7: SSH Key Authentication Setup

**Never use password authentication from untrusted networks!**

### On Your Workstation

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub
```

### On Raspberry Pi

```bash
# SSH to Pi (first time with password)
ssh pi@172.16.99.10

# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your public key, save

# Set permissions
chmod 600 ~/.ssh/authorized_keys

# Disable password authentication
sudo nano /etc/ssh/sshd_config

# Change these lines:
PasswordAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
ChallengeResponseAuthentication no

# Restart SSH
sudo systemctl restart ssh
```

### Test Key-Based Auth

```bash
# From workstation
ssh pi@172.16.99.10
# Should connect without password
```

---

## Step 8: UDM Advanced Settings

### DNS Settings for DMZ

**Settings → Networks → DMZ-WebServers → DHCP**

```
DNS Server 1: 1.1.1.1 (Cloudflare)
DNS Server 2: 1.0.0.1 (Cloudflare backup)
```

**Why Cloudflare DNS?**
- Fast, privacy-focused
- No logging to UDM (reduces attack surface)
- Already using Cloudflare Tunnel

### NTP Settings

**Settings → System → Time Zone**

Ensure Pi can sync time (needed for SSL/TLS):
- Pi will use DMZ gateway (172.16.99.1) as NTP server
- UDM forwards to pool.ntp.org

---

## Topology Summary

```
UDM Pro Max Port Configuration:

Port 1-4:   WAN (Internet)
Port 5-10:  Management VLAN (VLAN 1, 192.168.1.0/24)
Port 11-20: LAN VLAN (VLAN 10, 10.0.10.0/24)
Port 21:    Raspberry Pi (VLAN 99, 172.16.99.0/24) ← DMZ

WiFi Networks:
- Management WiFi → VLAN 1
- Guest WiFi → Isolated Guest Network (not DMZ)
```

---

## Troubleshooting

### Can't SSH to Raspberry Pi

**Check:**
1. Pi is connected to correct switch port
2. Switch port is assigned to VLAN 99
3. Pi has IP 172.16.99.10 (`ip addr show` on Pi)
4. Firewall rule `Allow-SSH-Management-to-DMZ` exists and is enabled
5. Your workstation IP is in "Management-Devices" group

**Debug:**
```bash
# From UDM console
ping 172.16.99.10

# Check firewall logs
tail -f /var/log/messages | grep 172.16.99.10
```

### Pi Can Access Management VLAN

**This is a security issue!**

**Fix:**
1. Check firewall rule order (Block rules should be before Allow)
2. Verify "Block-DMZ-to-Management" rule is enabled
3. Check rule source/destination IPs are correct
4. Check for any "Accept" rules that might override

### Cloudflare Tunnel Not Connecting

**Check:**
1. Pi can reach internet: `ping 1.1.1.1`
2. DNS works: `ping google.com`
3. Cloudflare API reachable: `curl https://api.cloudflare.com`
4. No firewall blocking outbound HTTPS (port 443)
5. Tunnel token is correct in `.env.prod`

---

## Security Checklist

- [ ] DMZ VLAN created (VLAN 99)
- [ ] Raspberry Pi assigned static IP (172.16.99.10)
- [ ] Firewall rule: Allow SSH Management→DMZ
- [ ] Firewall rule: Block DMZ→Management
- [ ] Firewall rule: Block DMZ→LAN
- [ ] Switch port configured for VLAN 99
- [ ] Password authentication disabled on Pi
- [ ] SSH key authentication configured
- [ ] Firewall logging enabled
- [ ] Tested isolation (Pi can't reach Management/LAN)
- [ ] Cloudflare Tunnel tested and working
- [ ] IPS/IDS enabled for DMZ
- [ ] mDNS disabled on DMZ
- [ ] Monitoring alerts configured

---

## Maintenance

### Monthly Security Review

```bash
# Check firewall logs for suspicious activity
# UniFi Console → System Logs → Firewall

# Check for blocked DMZ→Management attempts
grep "Block-DMZ-to-Management" /var/log/messages

# Review SSH authentication logs on Pi
sudo journalctl -u ssh | grep -i "failed\|denied"

# Check for outdated packages on Pi
ssh pi@172.16.99.10 "sudo apt update && sudo apt list --upgradable"

# Verify Cloudflare Tunnel health
ssh pi@172.16.99.10 "docker logs cloudflared-tunnel --tail 50"
```

### Quarterly Security Audit

- Review and update firewall rules
- Check for new CVEs affecting Raspberry Pi OS
- Rotate SSH keys
- Review Cloudflare Tunnel access logs
- Test disaster recovery procedure
- Update UDM firmware if available

---

## Alternative: VPN Access to DMZ

If you need SSH access from outside your network:

### Option 1: Tailscale

```bash
# On Raspberry Pi
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# On your laptop
# Install Tailscale client
# Connect to same Tailnet
# SSH via Tailscale IP (100.x.x.x)
```

### Option 2: WireGuard VPN on UDM

- Setup WireGuard on UDM Pro Max
- Connect VPN client to Management VLAN
- SSH to Pi via DMZ IP

**Don't:** Expose SSH (port 22) to internet directly!

---

## Cost Analysis

| Component | Cost |
|-----------|------|
| UDM Pro Max | Already owned |
| Network cable | ~$5 |
| Configuration time | 1-2 hours |
| **Total additional cost** | **~$5** |

**Security value:** Priceless! 🔒

---

## References

- [UniFi Firewall Documentation](https://help.ui.com/hc/en-us/articles/360042019353-UniFi-Network-Firewall)
- [VLAN Best Practices](https://help.ui.com/hc/en-us/articles/219654087)
- [Raspberry Pi Security Hardening](https://www.raspberrypi.com/documentation/computers/configuration.html#security)

---

**Network Security Status:** ✅ Zero-Trust DMZ Configured
**Last Updated:** 2025-10-14
**Security Level:** Maximum (isolated, firewalled, no inbound exposure)
