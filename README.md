<p align="center">
  <img src="./logo/logo.png" alt="Bug Bounty Hub Logo" width="120">
</p>

# Bug Bounty Hunting Hub
 
 **Author:** Tamilsevan S  
 **Role:** Cybersecurity | Ethical Hacker | Red Hat
 
 [![Website](https://img.shields.io/badge/Website-Visit-FFB000?style=for-the-badge&logo=googlechrome&logoColor=white)](https://tamilselvan-official.web.app/)
 [![GitHub](https://img.shields.io/badge/GitHub-Profile-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tamilselvan-S-Cyber-Security)
 [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tamilselvan-s)

## About This Collection

This comprehensive bug bounty payload collection is curated by **Tamilsevan S**, a professional Cybersecurity Expert, Ethical Hacker, and Red Hat certified security professional.

It is designed to help security researchers quickly test common and advanced vulnerability classes during authorized assessments and bug bounty programs.

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

## Tools & Advantages

### Why these payloads help (Advantages)

- **Speed**
  Use curated payloads to reduce time spent creating and validating test strings.
- **Coverage**
  Quickly test multiple bypass variants (encoding, wrappers, polyglots, different DB syntaxes).
- **Consistency**
  Repeatable test cases help you reproduce issues and write strong reports.
- **Automation Friendly**
  Payload lists can be plugged into fuzzers and scanners (e.g., `ffuf`, `nuclei`, `sqlmap`).

### Recommended tools (with use-cases)

| Tool | Category | Best For | Notes |
| --- | --- | --- | --- |
| Burp Suite | Proxy | Manual testing, tampering, auth/session testing | Use Repeater + Intruder for payload testing |
| OWASP ZAP | Proxy | Quick scans + passive analysis | Good free alternative |
| ffuf | Fuzzer | Parameter fuzzing, directory brute force | Use wordlists + payload lists |
| sqlmap | SQLi | Automated SQL injection exploitation | Always use with permission |
| nuclei | Scanner | Fast template-based vulnerability scanning | Add custom templates for your scope |
| dalfox | XSS | Finding/refining XSS | Great for parameter-based XSS |
| httpx | Recon | Probe live hosts + metadata | Pair with `subfinder`/`assetfinder` |
| gau / waybackurls | Recon | Collect historical URLs | Useful for hidden parameters |

## Table View (Quick Navigation)

| Vulnerability | Payload File | Typical Targets | Common Goal |
| --- | --- | --- | --- |
| SQL Injection | TamilsevanS-SQLInjection-Payloads.txt | Login, search, filters, IDs | Extract data / bypass auth |
| XSS | TamilsevanS-Advanced-XSS-Payloads.txt | Reflected params, stored fields | JS execution / session theft |
| Command Injection | TamilsevanS-CommandInjection-Payloads.txt | Ping, traceroute, file ops | RCE / command execution |
| LFI | TamilsevanS-LFI-Payloads.txt | File include, template render | Read sensitive files |
| Open Redirect | TamilsevanS-OpenRedirect-Payloads.txt | Redirect parameters | Phishing / OAuth bypass |
| SSRF | TamilsevanS-SSRF-Payloads.txt | URL fetchers, webhooks | Internal network access |
| XXE | TamilsevanS-XXE-Payloads.txt | XML parsers, file upload | File read / SSRF |
| NoSQL Injection | TamilsevanS-NoSQLInjection-Payloads.txt | JSON APIs, Mongo queries | Auth bypass / data extraction |

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
<p align="center">
  <a href="https://www.instagram.com/zh5_official/">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  </a>
  <a href="https://www.linkedin.com/in/zh5official/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://whatsapp.com/channel/0029Vb7gPitFCCoM116jcb04">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
  <a href="https://github.com/zh5official/">
    <img src="https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

<p align="center">
  <strong>Maintained by Tamilsevan S</strong> | Cybersecurity | Ethical Hacker | Red Hat
</p>
