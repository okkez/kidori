/// <reference path="../../typings/bundle.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="./components/navbar/navbar.directive.ts" />
/// <reference path="./components/malarkey/malarkey.directive.ts" />
/// <reference path="./components/webDevTec/webDevTec.service.ts" />
/// <reference path="./components/githubContributor/githubContributor.service.ts" />

declare var malarkey: any;
declare var toastr: Toastr;
declare var moment: moment.MomentStatic;

module kidori {
  'use strict';

  angular.module('kidori', ['ngAnimate', 'ngResource', 'ngRoute', 'mgcrea.ngStrap'])
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .config(Config)

    .config(RouterConfig)

    .run(RunBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .controller('MainController', MainController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey);
}
