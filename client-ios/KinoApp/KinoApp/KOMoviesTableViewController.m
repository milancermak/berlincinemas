//
//  KOMoviesTableViewController.m
//  KinoApp
//
//  Created by Milan Cermak on 19.9.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOAPIClient.h"
#import "KODataManager.h"
#import "KOModels.h"
#import "KOMovieCell.h"
#import "KOMoviesTableViewController.h"
#import "KOSecondaryDetailTableViewController.h"

NS_ENUM(NSUInteger, KOMoviesOrder) {
    KOMoviesAlphabetically,
    KOMoviesChronologically,
};

@interface KOMoviesTableViewController ()

@end

@implementation KOMoviesTableViewController

- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        NSString *alpha = NSLocalizedString(@"Alphabetically", @"Label in segmented control to order alphabetically");
        NSString *chrono = NSLocalizedString(@"Chronologically", @"Label in segmented control to order by time");
        UISegmentedControl *sortSwitch = [[UISegmentedControl alloc] initWithItems:@[alpha, chrono]];
        sortSwitch.selectedSegmentIndex = 0;
        [sortSwitch addTarget:self
                       action:@selector(sortOrderChangeAction:)
             forControlEvents:UIControlEventValueChanged];
        self.navigationItem.titleView = sortSwitch;
        self.title = NSLocalizedString(@"Movies", @"Title of the movies tab/table");
    }
    return self;
}

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

#pragma mark - UITableViewDelegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    KOMovie *movie = [KODataManager sharedManager].movies[indexPath.row];
    KOSecondaryDetailTableViewController *secondary = [[KOSecondaryDetailTableViewController alloc] initWithItem:movie];
    [self.navigationController pushViewController:secondary animated:YES];
}

- (void)updateData {
   [[KOAPIClient sharedClient] getMovies:^{
        [self.tableView reloadData];
        if (self.refreshControl.isRefreshing) {
            [self.refreshControl endRefreshing];
        }
    }];
}

#pragma mark - Actions

- (void)sortOrderChangeAction:(UISegmentedControl *)control {
    NSUInteger orderBy = KODataOrderAlphabetically;
    if (control.selectedSegmentIndex == KOMoviesChronologically) {
        orderBy = KODataOrderChronologically;
    }
    [KODataManager sharedManager].moviesOrder = orderBy;
    [self.tableView reloadData];
}

@end
