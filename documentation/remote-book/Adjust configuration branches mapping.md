---
layout: default
title: "5.6. Adjust configuration: branches mapping"
category: subchapter
weight: 14
---
5.6. Adjust configuration: branches mapping
[svn]
...
url = http://host/svn/repos

svn.url option value specifies project location. It is used as the root URL relative to which mappings paths are treated.

[svn]
...
trunk = trunk:refs/heads/master
branches = branches/*:refs/heads/*
tags = tags/*:refs/tags/*
shelves = shelves/*:refs/shelves/*

There are four kinds of branches that have to be mapped, each represented by its own option: trunk, branches, tags and shelves. Each option establishes SVN_PATH to GIT_REFERENCE correspondense for a particular kind of entity. Mapping syntax for trunk is:


trunk = SVN_PATH:GIT_REFERENCE

svn.trunk option allows to specify single SVN_PATH:GIT_REFERENCE mapping as its value. SVN_PATH is a path relative to the project svn.url location and GIT_REFERENCE is a git reference e.g. refs/heads/master. Mapping meaning is that changes made on or below SVN_PATH in Subversion project translated to the Git commits on GIT_REFERENCE and conversly, commits on GIT_REFERENCE would be translated to the changes below SVN_PATH. Mapping syntax for branches, tags and shelves is:


branches = SVN_PATH[/*]:GIT_REFERENCE[/*][;MAPPING]

These option allows to specify multiple mappings and each mapping may define many-to-many relationship. Mapping could be either one-to-one or many-to-many, in other words when '*' wildcard is used it should be present in the both sides of mapping. Each of the options must contain at least one many-to-many mapping (one with '*' wildcard). For example:


branches = branches/*:refs/heads/*;release_branhces/b1:refs/release/b1

Above mapping maps all branches in Subversion branches directory to the Git refs/heads namespace and, additionally, maps single release_branches/b1 branch to refs/releases/b1 Git branch reference.

Be careful when specifying mapping, it would not be possible to adjust it when synchronization is enabled. Only branches and tags that are included in the mapping will be imported and kept in sync by SubGit.