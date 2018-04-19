var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    glob = require('glob'),
    chalk = require('chalk'),
    log = console.log,
    fs = require('fs'),
    path = require('path'),
    del = require('del'),
    generatorName = 'webapp',  // 记住这个名字，下面会有用
    mkdirp = require('mkdirp');
 // 导出模块，使得yo xxx能够运行
module.exports = class extends Generator{
    constructor(args, opts) {
        // 默认会添加的构造函数
        // generators.Base.apply(this, arguments);
        super(args, opts);
        // 检查脚手架是否已经存在
        var dirs = glob.sync('+(src)');
        // this.argument('appname', { type: String, required: true });
        // this.log(this.options.appname);
        //now _.contains has been abandoned by lodash,use _.includes
        if(_.includes(dirs, 'src')){
            // 如果已经存在脚手架，则退出
            log(chalk.bold.green('资源已经初始化，退出...'));
            setTimeout(function(){
                process.exit(1);
            }, 200);
        }
    }
    prompting() {
        let questions = [
            {
                type: 'input',
                name: 'projectName',
                message: '输入项目名称',
                default: this.appname
            },
            {
                type: 'input',
                name: 'projectAuthor',
                message: '项目开发者',
                store: true,   // 记住用户的选择
                default: 'zhangpan'
            },{
                type: 'input',
                name: 'projectVersion',
                message: '项目版本号',
                default: '0.0.1'
            }
        ]
        return this.prompt(questions).then((answers) => {
            // log(this.options);
            let appname = answers.appname || this.options.appname;
            let options = Object.assign({}, answers, { appname });
            this.renderOpts = options;
            this.projectName = answers.projectName;
        });
    }
    writing() {
        log(this.destinationRoot(), this.destinationPath('index.js'), this.sourceRoot(), this.templatePath('package.json'));
        this.fs.copyTpl(this.templatePath('package.json'), 
            this.destinationPath('package.json'),
            {
                projectName: this.renderOpts.projectName,
                projectVersion: this.renderOpts.projectVersion,
                projectAuthor: this.renderOpts.projectAuthor
            });
        // let projectName = this.projectName;
        // let pagePath = projectName + '/pages/';
        // let compPath = projectName + '/components/';
        // let staticPath = projectName + '/static/';
        // let staticCssPath = projectName + '/static/css/';
        // let staticJsPath = projectName + '/static/js/';
        // let staticImgPath = projectName + '/static/image/';
        // mkdirp(pagePath);
        // mkdirp(compPath);
        // mkdirp(staticPath);
        // mkdirp(staticCssPath);
        // mkdirp(staticJsPath);
        // mkdirp(staticImgPath);
        // app() {
            // 拷贝文件，搭建脚手架
            /**
            * 可以在prompting阶段让用户输入
            * 也可以指定，完全根据个人习惯
            **/
            // this.projectOutput = './dist';
            // //拷贝文件
            // this.directory(this.projectAssets,'src');
            // this.copy('gulpfile.js', 'gulpfile.js');
            // this.copy('package.json', 'package.json');
        // }
    }
    install() {
        // 安装项目依赖
        log('install');
    }
    end() {
        log('end');
        // 搭建完执行的操作
        /**
          * 删除一些多余的文件
          * 由于无法复制空文件到指定目录，因此，如果想要复制空目录的话
          * 只能在空文件夹下建一个过渡文件，构建完后将其删除
        **/
        // var dirs = glob.sync('+(node_modules)');
        // del(['src/**/.gitignore','src/**/.npmignore']);
        // if(!_.includes(dirs, 'node_modules')){
        //     // 将你项目的node_modules和根目录下common-packages的node_modules进行软连接
        //     // 为什么要这样做，大家可以先想想
        //     this.spawnCommand('ln', ['-s', '/usr/local/lib/node_modules/common-packages/'+generatorName+'/node_modules', 'node_modules']);
        // }
    }

}