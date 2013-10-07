//
//  KOMoviesTableViewController.m
//  KinoApp
//
//  Created by Milan Cermak on 19.9.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOAPIClient.h"
#import "KOMovieCell.h"
#import "KOMoviesTableViewController.h"
#import "KOModels.h"
#import "KODataManager.h"

@interface KOMoviesTableViewController ()

@end

@implementation KOMoviesTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self updateData];
}

#pragma mark - UITableViewDataSource

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *cellIdentifier = @"movieCell";
    KOMovieCell *cell = (KOMovieCell *)[tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    if (!cell) {
        cell = [[KOMovieCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    KOMovie *movie = [KODataManager sharedManager].movies[indexPath.row];
    cell.textLabel.text = movie.title;
    return cell;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [[KODataManager sharedManager].movies count];
}

//#pragma mark - super

- (void)updateData {
   [[KOAPIClient sharedClient] getMovies:^{
        [self.tableView reloadData];
        if (self.refreshControl.isRefreshing) {
            [self.refreshControl endRefreshing];
        }
    }];
}

@end
