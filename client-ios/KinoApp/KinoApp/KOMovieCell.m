//
//  KOMovieCell.m
//  KinoApp
//
//  Created by Milan Cermak on 19.9.2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOMovieCell.h"

@interface KOMovieCell ()

// @property (nonatomic, strong) UILabel *cinemaName1;
// @property (nonatomic, strong) UILabel *cinemaName2;
// @property (nonatomic, strong) UILabel *cinemaName3;
@property (nonatomic, strong) UILabel *screeningTime1;
@property (nonatomic, strong) UILabel *screeningTime2;
@property (nonatomic, strong) UILabel *screeningTime3;

@end

@implementation KOMovieCell

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        // Initialization code
    }
    return self;
}

// - (void)layoutSubviews {
//     [self.view addSubview:self.screeningTime1];
//     [self.view addSubview:self.screeningTime2];
//     [self.view addSubview:self.screeningTime3];
// }

@end
