---
layout: default
title: "5.7. Adjust configuration: credentials"
category: subchapter
weight: 15
---
5.7. Adjust configuration: credentials
In order to create new revision in Subversion repository, SubGit needs credentials to authorize itself with Subversion server. SubGit user may provide multiple sets of credentials (username/password pairs) so that SubGit could choose with username to authorize with when creating new revision. There are a few sources SubGit looks for credentials:

GIT_REPOS/subgit/passwd file:  SubGit looks into GIT_REPOS/subgit/passwd file to read username/password pairs. Passwords are expected to be plaintext. It is a good idea to limit file read access for this file to the user account that runs SubGit.

username password
username1 secret
...
usernameN anothersecret

Path to the GIT_REPOS/subgit/passwd file could be changed in SubGit confgiruation file:

[auth "default"]
...
passwords = subgit/passwd

SubGit configuration file:  SSH and SSL client credentials could be defined explicitly in subgit/config configuration file:

[auth "default"]
...
sshKeyFile = /home/user/ssh-private-key.openssh
sshKeyFilePassphrase = secret

sslClientCertFile = /home/user/ssl-client-cert.p12
sslClientCertPassphrase = secret

Local Subversion credentials cache:  To make SubGit look for credentials in the local Subversion credentials cache, set auth.useDefaultSubversionConfigurationDirectory option to true and ensure that Subversion credentials cache path is correct:

[auth "default"]
...
useDefaultSubversionConfigurationDirectory = true
subversionConfigurationDirectory = /home/user/.subversion

HTTP Proxy Configuration
In case Subversion repository access requires proxy to be configured, then auth.useDefaultSubversionConfigurationDirectory must be set to true and proxy settings should be defined in Subversion servers file.