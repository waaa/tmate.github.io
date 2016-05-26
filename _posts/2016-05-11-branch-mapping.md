layout: post
title: "What are shelves?"
date: 2016-05-11
---

2.Repository layout

To define user's repository layout we use branches mapping.
Each folder is mapped to the reference (branch or tag) in the Git repository. For trunk folder the mapping is one-to-one as there could be only one trunk folder (as well as only one master reference in Git) and for other folders wildcard mapping could be used. Attention here, as what is left out is not translated by SubGit.
SubGit distinguishes the following folders in Subversion project as branches or tags.
Shelves <link to previous post> are special kind of branches used by SubGit to represent Git anonymous branches in Subversion repository. 

The following is the most common layout:

    trunk = trunk:refs/heads/master
    branches = branches/*:refs/heads/*
    shelves = shelves/*:refs/shelves/*
    tags = tags/*:refs/tags/*

Where SVN\_PATH (left part of mapping equation) is a path relative to the project svn.url location, and GIT\_REFERENCE (right part) is a Git reference e.g. refs/heads/master.
Mapping could be either one-to-one or many-to-many, so those paths may be partially replaced with **\***’s.
Keep in mind that the number of aterisks should be equal at right and left side of the mapping. Example as follows:

    branches = branches/*:refs/heads/*
    branches = branches/*/*:refs/heads/*/*
    branches = branches/*/project:refs/heads/*
    branches = branches/feature_*_2015:refs/heads/features/*

You have an option of defining only the 'trunk' branch, and that's going to be a 'master' branch, the root of the project. In this case the layout is going to look like this:
        
    trunk = :refs/heads/master

This layout could be generated automatically by running the following command:

    $ subgit configure --layout directory <directory name>

And even more, there is a feature of autedetection the whole layout by running this:

    $ subgit configure --layout auto --trunk path/to/trunk <directory name>

It's important to know that running this command leads to auto-filling ‘authors.txt’ as well. <link to remote-book 3.3 authors mapping>
This wouldn't work, though, if the branches in SVN were created by copy + svn add. (e.g. like in that repo: svn://svn.code.sf.net/p/desmume/code)

Always check your automatically generated layout! It’s being done all right in most cases, but it's always better to be sure.<br>

It all does actually look quite simple, if you think about it. There are nevertheless some layout cases worth looking at them. For example, if layout looks like this:

   trunk = trunk:refs/heads/master
   branches = branches/*:refs/heads/*
   branches = branches/releases/*:refs/heads/*
   shelves = shelves/*:refs/shelves/*
   tags = tags/*:refs/tags/*

SubGit will render an error, because in this example branches paths have an overlap. Two different SVN branches (branches/* and branches/releases/*)  point to the same Git name field (refs/heads/*). So if something should be translated from or to either of them, SubGIt is going to be confused which match to choose. The layout in this case should be corrected as shown below:

   trunk = trunk:refs/heads/master
   branches = branches/*:refs/heads/*
   branches = branches/releases/*:refs/heads/releases/*
   shelves = shelves/*:refs/shelves/*
   tags = tags/*:refs/tags/*

Now the branches/releases/* is going to be directly translated to refs/heads/releases/* and other way around, and everything is going to be alright.


With something like this in the configuration file, SubGit will return an error of a missing the 'trunk=' part.
    
    branches = branches/*:refs/heads/*
    shelves = shelves/*:refs/shelves/*
    tags = tags/*:refs/tags/*

And to the more complicated case. For example, what will happen with the layout like this? 
    
    trunk = trunk:refs/heads/master
    branches = branches/*:refs/heads/*
    branches = branches/*/*:refs/heads/*/*
    shelves = shelves/*:refs/shelves/*
    tags = tags/*:refs/tags/*

The first pattern only is going to be translated. For the reason that for the translation purposes of branch that is called ’x’, i.e. ‘branch/x’, refs/heads/x link will be created, which physically would be stored as GIT_REPO/refs/heads/x file, which leaves out the opportunity of creating a directory that has the same ‘x' name. And the other way around, refs/heads/x/y path excludes the opportunity of creating refs/heads/x file.
SubGit always tends to choose patterns that translate as much references as possible, and in that case it is the first one, and thus the second would be ignored.

As longs as we are on the topic of asterisks(‘*’), one should keep in mind that more that one asterisk is not allowed in one part of mapping equation, because it surely creates ambiguity during the translation, allowing at least two different interpretations. For example, if we have pattern like 'x*x*x', and string like 'xyxyxyx' (note, that in pattern there are three x's and in the string there are four), we could interpret it two differen ways: 'x-yxy-x-y-x' or 'x-y-x-yxy-x'. That can not be allowed in the branch mapping pattern.

But to answer some long awaited calls <link to  http://stackoverflow.com/questions/36848669/subgit-exclude-old-tags-by-name> that's already allowed for the definition of paths that are to be exluded <link to Exclude Path>, e.g:

    excludeBranches = branches/month-_*_year-2001*

With help of ExcludePath option some problematic branches could be muted out of translation.

For example, some SVN users keep their branches inside other branches' folders. 
<picture with folders>
In order to translate that piece of code to the Git, in case you want to keep the inner branch you will have to put the whole path to the inner folder in your configuration file:
    
    branches = branches/x/*:refs/heads/y/x/*

If you want to keep the outer branch translated, you would probably want to keep the inner branch one out of translation, especially if it takes too much space on your hard-drive. It will work with putting following in the configuration file:

    branches  = branches/*:refs/heads/*
    excludeBranches = branches/y/x

(picture with inner branches)
