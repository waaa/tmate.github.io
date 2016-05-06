---
layout: post
title: "What are shelves?"
date: 2016-05-06
---

We use shelves as a storage for what in SVN is called ‘anonymous branch’
If shelves are not used, you might lose out your anonymous SVN branches as well as the history of merges with those branches.
If you want to switch shelves off, all you need to do is to find in the SubGit configuration file the block where your trunk and other branches are defined and to remove this:

	  shelves = shelves/*:refs/shelves/*
