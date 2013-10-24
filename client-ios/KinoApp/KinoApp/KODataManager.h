//
//  KODataManager.h
//  KinoApp
//
//  Created by Milan Cermak on 7. 10. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

@class KOCinema;
@class KOMovie;

NS_ENUM(NSUInteger, KODataOrder) {
    KODataOrderAlphabetically,
    KODataOrderChronologically,
    KODataOrderSpacially
};

@interface KODataManager : NSObject


+ (instancetype)sharedManager;
- (void)updateCinemas:(NSArray *)newCinemas;
- (void)updateMovies:(NSArray *)newMovies;

- (KOCinema *)cinemaNamed:(NSString *)cinemaName;
- (KOMovie *)movieNamed:(NSString *)movieName inCinemaNamed:(NSString *)cinemaName;
- (NSArray *)moviesOrderedBy:(enum KODataOrder)order;

- (NSArray *)moviesForCinema:(KOCinema *)cinema;
- (NSArray *)cinemasForMovie:(KOMovie *)movie;

@end
