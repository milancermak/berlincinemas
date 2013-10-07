//
//  KODataManager.m
//  KinoApp
//
//  Created by Milan Cermak on 7. 10. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KODataManager.h"
#import "KOModels.h"

@implementation KODataManager

+ (instancetype)sharedManager {
    static KODataManager *manager;
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        manager = [KODataManager new];
    });
    return manager;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _cinemas = [NSArray new];
        _movies = [NSArray new];
    }
    return self;
}

- (void)updateCinemas:(NSArray *)newCinemas {
    NSMutableArray *new = [NSMutableArray new];
    NSError *err;
    for (NSDictionary *cinemaJSON in newCinemas) {
        KOCinema *cinema = [MTLJSONAdapter modelOfClass:[KOCinema class]
                                     fromJSONDictionary:cinemaJSON
                                                  error:&err];
        if (err) {
            NSLog(@"Error parsing cinema JSON: %@\n%@", cinemaJSON, err);
        } else {
            [new addObject:cinema];
        }
    }
    _cinemas = [NSArray arrayWithArray:new];
}

- (void)updateMovies:(NSArray *)newMovies {
    NSMutableArray *new = [NSMutableArray new];
    NSError *err;
    for (NSDictionary *movieJSON in newMovies) {
        KOMovie *movie = [MTLJSONAdapter modelOfClass:[KOMovie class]
                                   fromJSONDictionary:movieJSON
                                                error:&err];
        if (err) {
            NSLog(@"Error parsing movie JSON: %@\n%@", movieJSON, err);
        } else {
            [new addObject:movie];
        }
    }
    _movies = [NSArray arrayWithArray:new];
}

@end
