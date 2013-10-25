//
//  KOMovieScreeningViewController.m
//  KinoApp
//
//  Created by Milan Cermak on 24.10.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import <GoogleMaps/GoogleMaps.h>
#import "KOModels.h"
#import "KOMovieScreeningViewController.h"
#import "Masonry.h"

const NSUInteger initialMapZoomLevel = 10;
const CGFloat goldenRatio = 1.61803398875;

@interface KOMovieScreeningViewController ()

@property (nonatomic, strong) GMSMapView *mapView;
@property (nonatomic, strong, readonly) KOMovie *movie;

- (void)setUpAutolayoutConstraints;

@end

@implementation KOMovieScreeningViewController

- (instancetype)initWithMovie:(KOMovie *)movie {
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        _movie = movie;
        self.title = movie.title;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    [self.view addSubview:self.mapView];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self setUpAutolayoutConstraints];
}

#pragma mark - Private

- (void)setUpAutolayoutConstraints {
    CGFloat topOffset = self.topLayoutGuide.length;

    [self.mapView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view.mas_top).offset(topOffset);
        make.right.equalTo(self.view.mas_right);
        make.left.equalTo(self.view.mas_left);
        make.height.equalTo(self.view.mas_height).multipliedBy(1/goldenRatio);
    }];
}

#pragma mark - Subviews

- (GMSMapView *)mapView {
    if (!_mapView) {
        GMSCameraPosition *camera = [GMSCameraPosition cameraWithTarget:self.movie.cinema.location.coordinate
                                                                   zoom:initialMapZoomLevel];
        _mapView = [GMSMapView mapWithFrame:CGRectZero camera:camera];
        _mapView.buildingsEnabled = NO;
        _mapView.myLocationEnabled = YES;
    }
    return _mapView;
}

@end
