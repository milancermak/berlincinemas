//
//  KOBaseTableViewController.m
//  KinoApp
//
//  Created by Milan Cermak on 19.9.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOBaseTableViewController.h"

@interface KOBaseTableViewController ()

@end

@implementation KOBaseTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIRefreshControl *refreshControl = [UIRefreshControl new];
    [refreshControl addTarget:self
                       action:@selector(updateData)
             forControlEvents:UIControlEventValueChanged];
    self.refreshControl = refreshControl;
}

- (void)updateData {}

@end
