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

@property (nonatomic) NSArray *cinemas;
@property (nonatomic) NSArray *movies;

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

- (NSArray *)moviesOrderedBy:(enum KODataOrder)order {
    NSArray *values;
    if (order == KODataOrderAlphabetically) {
        NSMutableSet *found = [NSMutableSet new];
        NSIndexSet *uniqueMoviesByTitleIndexes =
            [self.movies indexesOfObjectsPassingTest:^(id obj, NSUInteger idx, BOOL *stop) {
                KOMovie *movie = (KOMovie *)obj;
                if ([found containsObject:movie.title]) {
                    return NO;
                } else {
                    [found addObject:movie.title];
                    return YES;
                }
            }];
        NSSortDescriptor *byTitle = [NSSortDescriptor sortDescriptorWithKey:@"title"
                                                                  ascending:YES
                                                                   selector:@selector(localizedStandardCompare:)];
        values = [[self.movies objectsAtIndexes:uniqueMoviesByTitleIndexes]
                     sortedArrayUsingDescriptors:@[byTitle]];
    } else if (order == KODataOrderChronologically) {
        NSSortDescriptor *byScreeningTime = [NSSortDescriptor sortDescriptorWithKey:@"date"
                                                                          ascending:YES];
        values = [self.movies sortedArrayUsingDescriptors:@[byScreeningTime]];
    } else {
        NSLog(@"Incorrect data order for movies: %d", order);
    }
    return values;
}

- (KOCinema *)cinemaNamed:(NSString *)cinemaName {
    __block KOCinema *foundCinema = nil;
    [self.cinemas enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        KOCinema *oneCinema = (KOCinema *)obj;
        if ([oneCinema.name isEqual:cinemaName]) {
            foundCinema = oneCinema;
            *stop = YES;
        }
    }];
#ifdef DEBUG
    if (!foundCinema) {
        NSLog(@"Didn't find KOCinema with name %@", cinemaName);
    }
#endif
    return foundCinema;
}

- (KOMovie *)movieNamed:(NSString *)movieName inCinemaNamed:(NSString *)cinemaName {
    for (KOMovie *aMovie in self.movies) {
        if ([aMovie.title isEqual:movieName] &&
            [aMovie.cinema.name isEqual:cinemaName]) {
            return aMovie;
        }
    }
    NSLog(@"Could not find movie %@ in cinema %@", movieName, cinemaName);
    return nil;
}

- (NSArray *)moviesForCinema:(KOCinema *)cinema {
    return [self.movies filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"%K = %@", @"cinema.name", cinema.name]];
}

- (NSArray *)cinemasForMovie:(KOMovie *)theMovie {
    NSArray *sameMovies = [self.movies filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"%K = %@", @"title", theMovie.title]];
    NSMutableSet *cinemas = [NSMutableSet new];
    for (KOMovie *movie in sameMovies) {
        [cinemas addObject:movie.cinema];
    }

    return [cinemas allObjects];
}

@end
