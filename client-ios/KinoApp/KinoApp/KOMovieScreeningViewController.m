//
//  KOMovieScreeningViewController.m
//  KinoApp
//
//  Created by Milan Cermak on 24.10.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOModels.h"
#import "KOMovieScreeningViewController.h"

@interface KOMovieScreeningViewController ()

@end

@implementation KOMovieScreeningViewController

- (instancetype)initWithMovie:(KOMovie *)movie; {
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        self.title = movie.title;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
}

@end
