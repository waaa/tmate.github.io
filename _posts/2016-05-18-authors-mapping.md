---
layout: post
title: "Authors mapping"
date: 2016-05-18
---

###3. What are the options when talking about authors mapping?

Authors mapping is a question at first sight quite simple, but it's getting interesting and a bit more complicated if a closer look is taken. In this post an attempt is made to clear up a situation regarding different user-cases and problems that could occur during set up of a right way of mapping commit authors between two systems of SubGit and SVN.

First of all some basics need to be laid out.
In SVN the 'author' variable is just a string. Like that:
    
    'Michael'

That string can even contain non-printable characters like space ' '. 
Whereas in Git authors has two fields, a nickname and an e-mail. 
    
    Michael <michael@example.com>

**From SVN to Git**

To translate from SVN to Git we have to look for some more or less credible email. Taking a little too big step forward, it's important to say that if no email is found, SubGit will automatically generate one, using core config option **defaultDomain**

    [core]

    defaultDomain = company.com

In this case, if it's not possible to find user 'Michael' nowhere in the system, SubGit will substitute it with auto-generated 'michael@company.com'.

To avoid this a bit awkward situation is always better to keep authors' info up-to-date. For that there are few options.
First one - is to store a list of all the active authors separatedly and explicitly in a file, at which points the core config variable 'authorsFile'. By default it's **GIT_REPOS/subgit/authors.txt**. It looks like this:

    ashley = Ashley <ashley@example.com>
    david = David <david@example.com>
    curtis = Curtis <curtis@example.com>

On the left there are SVN logins and on the right - Git pairs of nicknames and emails.


**Form Git to SVN**

When translating from Git to SVN, there could be some problem in a sense that if we don't have enough rights, we can't set the right author for the commit. The most common reason for the wrong commit author could be disability to access revision properties or an absense of the right user in the 'passwd' file. This problem could also occur in cases when we don't need a password (for example if we're using 'file://' protocol, more details on those cases await ahead) but for the most cases we would be needing a password to access user's SVN account.

There are three lmain cases.
First one is when everything is fairly easy:

**When 'svn+ssh://' or 'file:///' protocols or 'http(s)://' with mod_dav_svn(link_to http://svnbook.red-bean.com/en/1.7/svn.ref.mod_dav_svn.conf.html) version less than 1.7.20 or 
1.8.12**

Those are very special cases. The thing is, that when 'svn+ssh://' or 'file:///' protocols are used, SubGit can create a commit using a service pair of login and password, and then SubGit has enough rights to just go and change the revision property of a commit so it would have the same string in the field 'author' as it states according to Git.

At some point it was working also when using 'http(s)://' protocol, which was due to vulnerability in SVN's programming code. We (SubGit development team) did a nice thing and let them know about this vulnerability, so in newer versions of SVN server it is no longer the case.

Another level is a bit more tricky:

**When other protocls or versions are used but there is an acess to SVN server**

If you have a possibility to alter SVN revision properties if needed, you can switch on a 'pre-revprop-change' hook there (here is an instruction how to do that: <link to http://svnbook.red-bean.com/en/1.7/svn.ref.reposhooks.pre-revprop-change.html>) and then put an executable 'pre-revprop-change' file in the 'hooks' directory.

It works perfectly because it's possible then to put only one fake user to 'authors.txt' and 'passwd' files, and with this user instance SubGit will authenticate itself against SVN and then SubGit will be able to change authors of the commits that already have been created.

The pre-revprop-change hook is invoked before a revision property is added, modified or deleted. Unlike other hooks, this hook must exist for revision properties to be changed.  If the hook does not exist, Subversion will behave as if the hook were present, but failed. The hook itself is an executable file.

Here is the example of such an executable file for a Unix /bin/sh interpreter. On a Windows system, one should name the hook program 'pre-revprop-change.bat' or 'pre-revprop-change.exe', but the basic idea is the same.
    
    REPOS="$1"
    REV="$2"
    USER="$3"
    PROPNAME="$4"
    ACTION="$5"

    if [ "$ACTION" = "M" -a "$PROPNAME" = "svn:log" ]; then exit 0; fi

    echo "Changing revision properties other than svn:log is prohibited" >&2
    exit 1

If the idea of using such hook is not appealing, there is still option to downgrade to older SVN server software version to be considered.

And the last level is the one where things really do get sad:

**When there is no access to SVN server**

When none of the conditions listed above were met, when it's a newest version of SVN server and only http(s)://' protocol could possibly be used, there is one last solution - to store all the active authors in the 'authors.txt' file and store passwords in the 'passwd' file, which lies next to the 'authors.txt' file and stores passwords as normal strings like:

    michael 1aFv0eT6

This solution has some obvious flaws, like nobody likes to store their passwords as simple strings, or that you have to keep that file constantly updated to avoid inconsistencies. 

**Last couple of words on the topic**

Authors mapping file (authors.txt) contents may be altered at any time and new mappings become effective immediately. Keep in mind that new mappings will not alter existing commits and revisions. To change them, you may reinstall SubGit using **--rebuild** option, but this option is changing all hashes in the history which may cause problems later. 

**If there is a possibility, SubGit team recommends to use a 'pre-revprop-change' hook and use only a SubGit user for an authentication. It really does make life so much easier**
