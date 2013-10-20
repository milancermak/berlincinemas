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
#import "KOMovieNameCell.h"
#import "KOMovieScreeningCell.h"
#import "KOMoviesTableViewController.h"
#import "KOSecondaryDetailTableViewController.h"

NS_ENUM(NSUInteger, KOMoviesOrder) {
    KOMoviesAlphabetically,
    KOMoviesChronologically,
};

@interface KOMoviesTableViewController ()

@property (nonatomic, copy) NSArray *displayedData;
@property (nonatomic, strong) UISegmentedControl *sortSwitch;

- (void)configureMovieNameCell:(KOMovieNameCell *)cell atIndexPath:(NSIndexPath *)indexPath;
- (void)configureMovieScreeningCell:(KOMovieScreeningCell *)cell atIndexPath:(NSIndexPath *)indexPath;
- (void)displayData;

@end

@implementation KOMoviesTableViewController

- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        self.navigationItem.titleView = self.sortSwitch;
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
    id cell;

    if (self.sortSwitch.selectedSegmentIndex == KOMoviesAlphabetically) {
        static NSString *movieNameCellID = @"movieNameCell";
        cell = [tableView dequeueReusableCellWithIdentifier:movieNameCellID];
        if (!cell) {
            cell = [[KOMovieNameCell alloc] initWithStyle:UITableViewCellStyleDefault
                                          reuseIdentifier:movieNameCellID];
        }
        [self configureMovieNameCell:cell atIndexPath:indexPath];
    } else { // KOMoviesChronologically
        static NSString *movieScreeningCellID = @"movieScreeningCell";
        cell = [tableView dequeueReusableCellWithIdentifier:movieScreeningCellID];
        if (!cell) {
            cell = [[KOMovieScreeningCell alloc] initWithStyle:UITableViewCellStyleDefault
                                               reuseIdentifier:movieScreeningCellID];
        }
        [self configureMovieScreeningCell:cell atIndexPath:indexPath];
    }

    return (UITableViewCell *)cell;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.displayedData count];
}

#pragma mark - UITableViewDelegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    KOMovie *movie = self.displayedData[indexPath.row];
    KOSecondaryDetailTableViewController *secondary = [[KOSecondaryDetailTableViewController alloc] initWithItem:movie];
    [self.navigationController pushViewController:secondary animated:YES];
}

#pragma mark - Private

- (void)configureMovieNameCell:(KOMovieNameCell *)cell atIndexPath:(NSIndexPath *)indexPath {
    KOMovie *cellMovie = self.displayedData[indexPath.row];
    cell.textLabel.text = cellMovie.title;
}

- (void)configureMovieScreeningCell:(KOMovieScreeningCell *)cell atIndexPath:(NSIndexPath *)indexPath {
    KOMovie *cellMovie = self.displayedData[indexPath.row];
    cell.textLabel.text = [NSString stringWithFormat:@"%@ %@", cellMovie.date, cellMovie.title];
}

- (void)displayData {
    NSUInteger orderBy = KODataOrderAlphabetically;
    if (self.sortSwitch.selectedSegmentIndex == KOMoviesChronologically) {
        orderBy = KODataOrderChronologically;
    }
    self.displayedData = [[KODataManager sharedManager] moviesOrderedBy:orderBy];
    [self.tableView reloadData];
}

- (void)updateData {
   [[KOAPIClient sharedClient] getMovies:^{
       [self displayData];
       if (self.refreshControl.isRefreshing) {
           [self.refreshControl endRefreshing];
       }
   }];
}

#pragma mark - Subviews

- (UISegmentedControl *)sortSwitch {
    if (!_sortSwitch) {
        NSString *alpha = NSLocalizedString(@"Alphabetically", @"Label in segmented control to order alphabetically");
        NSString *chrono = NSLocalizedString(@"Chronologically", @"Label in segmented control to order by time");
        _sortSwitch = [[UISegmentedControl alloc] initWithItems:@[alpha, chrono]];
        _sortSwitch.selectedSegmentIndex = 0;
        [_sortSwitch addTarget:self
                        action:@selector(displayData)
              forControlEvents:UIControlEventValueChanged];
    }
    return _sortSwitch;
 }

@end
