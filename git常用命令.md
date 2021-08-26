# git常用命令

## 基础提交代码

```
 git checkout -b dev   // 在本地创建⼀个dev分⽀
 git commit -a -m '增加新项⽬⽂件' //提交本地 
 git checkout develop/git checkout master //切换分⽀
 git merge feature/init 分⽀代码合并
 git pull origin develop//更新代码
 git push origin develop/master //提交代码
```


## 更新远程分⽀并同步到本地 

```
git fetch
git checkout -b develop origin/develop(同步更新远程develop分⽀到本地) 
```

##  更新代码及切换分⽀

```
//作⽤是checkout远程的dev分⽀，在本地起名为dev分⽀，并切换到本地的dev分⽀
git checkout -b dev origin/dev
git checkout --track origin/develop //创建本地分⽀与远程分⽀代码同步

//git地址改变执⾏
git remote set-url origin ssh://git@218.17.162.119B8809/xusong/DQMSWeb.git

// 更新遇到冲突的解决办法(修改好所有冲突后执⾏) 
git add -A
git commit -m '修改冲突'
git push origin develop/master //提交代码
```

## 查看本地和远程仓库的所有分⽀

```
git branch -a 
```

## 远程操作 

```
//创建远程分⽀
git checkout -b develop
git push origin develop:develop 

//创建本地分⽀和远程分⽀关联
git branch --set-upstream-to=origin/remote_branch your_branch

//删除远程分⽀(删除远程ui分⽀) 
git push origin --delete ui

//删除本地分⽀
git branch -d 分⽀名

//远程分⽀合并(例如develop分⽀合并到master分⽀) 
git checkout master
git merge develop
git pull origin master
git push origin master
```

## 远程分⽀打Tag

```
//在远程分⽀上打tag(在master分⽀上打最好) 
//建⽴本地tag分⽀ 
git tag -a V5.6 -m '发布版本5.6的所有功能' 

//把本地V5.6版本发布到远程
git push origin V5.6

//删除本地tag  
git tag -d V5.6.3
git push origin :refs/tags/V5.6.3

//更新最新的远程分⽀及tag 
git pull
```

## 下⾯是我如何将⼀个标签重命名为new 

```
git tag new
old git tag -d old
git push origin :refs/tags/old 
git push --tags 
```

##  合并某个commit 

```
git checkout master  //切换到⼀个需要合并到的分⽀ 
git pull orgin master  //更新远程分⽀的代码
git cherry-pick commitId1 commitId2  //如果有冲突
git commit -m '修改冲突'
git push origin master
```

## 检出对应tag的代码

```
 git checkout -b dqms_yubei DQMSV6.2.7.8_RELEASE
 //上传到远程分⽀ 
 git push origin dqms_yubei:dqms_yubei 
 
```

## 回退到某个tag版本

```
 git checkout master 
 git show V5.7.1.19 
 git reset --hard 71086016198e8b9285aa40120bcab2bc32a4a28e //回退到5.7.1.19版本 
 git checkout -b newBranch
 git branch -a //查看所有远程分⽀
```

## 清除git的缓存状态(设置忽略⽂件不⽣效的问题) 

```
git rm -r --cached . 
git add . 
git commit -m 'update .gitignore' 
```

## git 邮箱和名称的设置 

```
git config --global user.name "xusong"
git config --global user.email song.xu@audaque.com
```



## git 设置⼤⼩写敏感

```
git config core.ignorecase false 
git config --get core.ignorecase //查看是否⼤⼩写敏感(true不敏感 false敏感) 
```



##  git subtree 

```
//查看关联的仓库
git remote 

//关联⼦仓库
git remote add -f moduleAuth 
ssh://git@172.16.1.155B8809/gitlabadmin/moduleAuth.git 

//增加⼦仓库 
git subtree add --prefix=moduleAuth moduleAuth develop --squash 

//更新⼦仓库 git subtree pull --prefix=moduleAuth moduleAuth develop --squash 

//提交⼦仓库代码 
git subtree push --prefix=moduleAuth moduleAuth develop
```



## 保存暂时没做完的功能 

```
git stash //可以把当前⼯作现场“储藏”起来，等以后恢复现场后继续⼯作 
git status 
git stash list //查看储藏
git stash apply //恢复，但是恢复后，stash内容并不删除，你需要⽤git stash drop来 删除 
git stash pop //恢复的同时把stash内容也删了
```



