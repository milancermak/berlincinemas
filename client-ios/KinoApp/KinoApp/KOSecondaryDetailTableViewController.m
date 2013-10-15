//
//  KOSecondaryDetailTableViewController.m
//  KinoApp
//
//  Created by Milan Cermak on 15. 10. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KODataManager.h"
#import "KOModels.h"
#import "KOSecondaryDetailTableViewController.h"

NS_ENUM(NSUInteger, KOSecondaryDetailDisplayType) {
    KOSecondaryCinema,
    KOSecondaryMovie
};

@interface KOSecondaryDetailTableViewController ()

@property (nonatomic, assign) enum KOSecondaryDetailDisplayType displayOf;
@property (nonatomic, strong) KOCinema *cinema;
@property (nonatomic, strong) KOMovie *movie;
@property (nonatomic, copy) NSArray *data;

@end

@implementation KOSecondaryDetailTableViewController

- (instancetype)initWithItem:(id)item {
    self = [super initWithStyle:UITableViewStylePlain];
    if (self) {
        if ([item isKindOfClass:[KOCinema class]]) {
            self.cinema = item;
            self.data = [[KODataManager sharedManager] moviesForCinema:self.cinema];
            self.displayOf = KOSecondaryCinema;
        } else if ([item isKindOfClass:[KOMovie class]]) {
            self.movie = item;
            self.data = [[KODataManager sharedManager] cinemasForMovie:self.movie];
            self.displayOf = KOSecondaryMovie;
        } else {
            NSAssert(@"Unknown model class to display secondary listing: %@",
                     NSStringFromClass([item class]));
        }
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.data count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *cellIdentifier = @"secondaryCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    NSString *text;
    if (self.displayOf == KOSecondaryCinema) {
        // data holds KOMovie objects
        text = ((KOMovie *)self.data[indexPath.row]).title;
    } else {
        // data holds KOCinema objecs
        text = ((KOCinema *)self.data[indexPath.row]).name;
    }
    cell.textLabel.text = text;
    return cell;
}

@end
