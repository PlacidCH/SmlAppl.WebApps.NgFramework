# SmlAppl.WebApps.NgFramework
Angular Framework for SML WebApps

Installing
-----
You can use bower to install the package:

```
bower install SmlAppl-WebApps-NgFramework --save
```

Usage
-----

```
angular.module("myApp", [ "smlAppl.webApps.framework" ]);
```

```
    .constant("appConfig", {
  		uriBaseApi: "api/v1/",
  		uriBaseToken: "oauth/token",
      baseAdminPath: "app/admin",
  		baseViewsPath: "app/views/",
  		baseAdminViewsPath: "app/admin/views/",
  		lookupsDefaultLang: "de", // because translation will be made with ng-translate from the KeyId, the lang actually doesn't matter
  	})
    ;
```
