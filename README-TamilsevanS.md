# ============================================
# Bug Bounty Payload Collection
# ============================================
# Author: Tamilsevan S
# Role: Cybersecurity | Ethical Hacker | Red Hat
# Website: https://tamilselvan-official.web.app/
# GitHub: https://github.com/Tamilselvan-S-Cyber-Security
# LinkedIn: https://linkedin.com/in/tamilselvan-s
# ============================================

## About This Collection

This comprehensive bug bounty payload collection is curated by Tamilsevan S, a professional Cybersecurity Expert, Ethical Hacker, and Red Hat certified security professional.

## Payload Categories

### Web Application Security
1. **TamilsevanS-SQLInjection-Payloads.txt** - SQL Injection payloads for MySQL, PostgreSQL, Oracle, MSSQL, NoSQL
2. **TamilsevanS-Advanced-XSS-Payloads.txt** - Cross-Site Scripting (XSS) payloads including DOM-based, Stored, Reflected
3. **TamilsevanS-CommandInjection-Payloads.txt** - OS Command Injection for Linux & Windows
4. **TamilsevanS-LFI-Payloads.txt** - Local File Inclusion with wrappers and encodings
5. **TamilsevanS-OpenRedirect-Payloads.txt** - Open Redirect bypass techniques
6. **TamilsevanS-SSRF-Payloads.txt** - Server-Side Request Forgery payloads
7. **TamilsevanS-XXE-Payloads.txt** - XML External Entity injection payloads
8. **TamilsevanS-NoSQLInjection-Payloads.txt** - MongoDB, CouchDB, Elasticsearch injection

### Automation & Scanning
9. **TamilsevanS-Nuclei-Templates.yaml** - Nuclei vulnerability scanner templates

### Legacy Payloads (Original Collection)
- XSS Payloads/Best-XSS-Payloads.txt
- XSS Payloads/payload.txt
- XSS Payloads/xss_all_payloads.txt
- CMDinjection-payloads.txt
- CORS-payloads.txt
- CRLFi-Payloads.txt
- SQL-Injection-Payloads.txt
- SSRF.txt

## Quick Reference

### SQL Injection Quick Check
```
' OR '1'='1
' OR 1=1--
1' AND 1=1--
1' AND 1=2--
```

### XSS Quick Check
```
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
```

### Command Injection Quick Check
```
; cat /etc/passwd
| whoami
`id`
$(ls)
```

## Usage Guidelines

⚠️ **DISCLAIMER**: These payloads are for authorized security testing only. Always ensure you have:
- Written permission from the system owner
- Proper authorization for penetration testing
- Compliance with bug bounty program rules
- Adherence to responsible disclosure practices

## Contact

For professional security consulting, penetration testing services, or bug bounty collaboration:

- Website: https://tamilselvan-official.web.app/
- Email: Contact through website
- LinkedIn: https://linkedin.com/in/tamilselvan-s

## License

This collection is provided for educational and authorized security testing purposes.

---
**Maintained by Tamilsevan S** | Cybersecurity | Ethical Hacker | Red Hat | https://tamilselvan-official.web.app/
