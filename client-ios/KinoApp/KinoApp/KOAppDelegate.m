//
//  KOAppDelegate.m
//  KinoApp
//
//  Created by Milan Cermak on 19.9.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import <GoogleMaps/GoogleMaps.h>
#import "KOAppDelegate.h"
#import "KOMoviesTableViewController.h"
#import "UIKit+AFNetworking.h"

@implementation KOAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [AFNetworkActivityIndicatorManager sharedManager].enabled = YES;
    [GMSServices provideAPIKey:@"AIzaSyAEL-LgDwm_tek0o4p41DG4xop6V6yAF-M"];

    UINavigationController *movies = [[UINavigationController alloc] initWithRootViewController:[KOMoviesTableViewController new]];
    UITabBarController *tab = [UITabBarController new];
    [tab setViewControllers:@[movies] animated:NO];

    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.rootViewController = tab;
    //self.window.tintColor = TODO
    [self.window makeKeyAndVisible];
    return YES;
}

@end
