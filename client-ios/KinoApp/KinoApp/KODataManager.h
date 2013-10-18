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

@property (nonatomic, readonly) NSArray *cinemas;
@property (nonatomic, readonly) NSArray *movies;
@property (nonatomic, assign) enum KODataOrder cinemasOrder;
@property (nonatomic, assign) enum KODataOrder moviesOrder;

+ (instancetype)sharedManager;
- (void)updateCinemas:(NSArray *)newCinemas;
- (void)updateMovies:(NSArray *)newMovies;

- (NSArray *)moviesForCinema:(KOCinema *)cinema;
- (NSArray *)cinemasForMovie:(KOMovie *)movie;

@end
