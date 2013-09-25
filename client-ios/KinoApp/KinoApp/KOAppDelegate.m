//
//  KOAppDelegate.m
//  KinoApp
//
//  Created by Milan Cermak on 19.9.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOAppDelegate.h"
#import "KOMoviesTableViewController.h"

@implementation KOAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:[KOMoviesTableViewController new]];

    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.rootViewController = nav;
    //self.window.tintColor = TODO
    [self.window makeKeyAndVisible];
    return YES;
}

@end
