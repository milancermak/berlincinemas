//
//  KOModels.m
//  KinoApp
//
//  Created by Milan Cermak on 25. 9. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOModels.h"
#import "KODataManager.h"

@implementation KOCinema

+ (NSDictionary *)JSONKeyPathsByPropertyKey {
    return @{@"location": @"ll",
             @"name": @"name"};
}

+ (NSValueTransformer *)locationJSONTransformer {
    return [MTLValueTransformer transformerWithBlock:^(NSString *ll) {
        NSArray *latLng = [ll componentsSeparatedByString:@","];
        CLLocationDegrees latitude = [(NSString *)latLng[0] doubleValue];
        CLLocationDegrees longitude = [(NSString *)latLng[1] doubleValue];
        return [[CLLocation alloc] initWithLatitude:latitude longitude:longitude];
    }];
}

@end

@implementation KOMovie

+ (NSValueTransformer *)dateJSONTransformer {
    return [MTLValueTransformer transformerWithBlock:^(NSString *RFC3339) {
        NSString *RFC3339Format = @"yyyy-MM-ddThh:mm:SSZZZZZ";
        NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
        formatter.dateFormat = RFC3339Format;
        return [formatter dateFromString:RFC3339];
    }];
}

+ (NSValueTransformer *)cinemaJSONTransformer {
    return [MTLValueTransformer transformerWithBlock:^(NSString *cinemaName) {
        __block KOCinema *cinemaForName;
        [[KODataManager sharedManager].cinemas enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            KOCinema *oneCinema = (KOCinema *)obj;
            if ([oneCinema.name isEqualToString:cinemaName]) {
                cinemaForName = oneCinema;
                stop = YES;
            }
        }];
        if (!cinemaForName) {
            NSLog(@"Didn't find KOCinema with name %@", cinemaName);
        }
        return cinemaForName;
    }];
}

@end
