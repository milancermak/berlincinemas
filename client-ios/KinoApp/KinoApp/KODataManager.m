//
//  KODataManager.m
//  KinoApp
//
//  Created by Milan Cermak on 7. 10. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

// TODO: add an NSCache for the moviesForCinema and cinemasForMovie

#import "KODataManager.h"
#import "KOModels.h"

@interface KODataManager ()

- (void)sortCinemas;
- (void)sortMovies;

@end

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
        _cinemasOrder = KODataOrderAlphabetically;
        _moviesOrder = KODataOrderAlphabetically;
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
    [self sortMovies];
}

- (NSArray *)moviesForCinema:(KOCinema *)cinema {
    return [self.movies filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^(id obj, NSDictionary *bindings) {
        KOMovie *movie = (KOMovie *)obj;
        for (KOScreening *screening in movie.screenings) {
            if ([screening.cinema.name isEqualToString:cinema.name]) {
                return YES;
            }
        }
        return NO;
    }]];
}

- (NSArray *)cinemasForMovie:(KOMovie *)movie {
    NSMutableArray *cinemas = [NSMutableArray new];
    for (KOScreening *screening in movie.screenings) {
        NSString *screeningCinemaName = (NSString *)screening.cinema; // not sure why it's a NSString and not an KOCinema
        for (KOCinema *cinema in self.cinemas) {
            if ([cinema.name isEqualToString:screeningCinemaName]) {
                [cinemas addObject:cinema];
            }
        }
    }
    return cinemas;
}

#pragma mark - Accessors

- (void)setCinemasOrder:(enum KODataOrder)newOrder {
    _cinemasOrder = newOrder;
    [self sortCinemas];
}

- (void)setMoviesOrder:(enum KODataOrder)newOrder {
    _moviesOrder = newOrder;
    [self sortMovies];
}

#pragma mark - Private

- (void)sortCinemas {
    NSLog(@"TODO");
}

- (void)sortMovies {
    if (self.moviesOrder == KODataOrderAlphabetically) {
        NSSortDescriptor *byName = [NSSortDescriptor sortDescriptorWithKey:@"title"
                                                                 ascending:YES
                                                                  selector:@selector(localizedStandardCompare:)];
        _movies = [self.movies sortedArrayUsingDescriptors:@[byName]];
    }
}

@end
