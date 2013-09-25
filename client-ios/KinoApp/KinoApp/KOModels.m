//
//  KOModels.m
//  KinoApp
//
//  Created by Milan Cermak on 25. 9. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "KOModels.h"

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

+ (NSDictionary *)JSONKeyPathsByPropertyKey {
    return @{@"screenings": @"screenings",
             @"title": @"title"};
}

+ (NSValueTransformer *)screeningsJSONTransformer {
    return [MTLValueTransformer transformerWithBlock:^(NSArray *s) {
        __block NSMutableArray *screenings = [NSMutableArray arrayWithCapacity:[s count]];
        [s enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            NSDictionary *screeningJSON = (NSDictionary *)obj;
            NSError *error = nil;
            KOScreening *screening = [MTLJSONAdapter modelOfClass:[KOScreening class]
                                               fromJSONDictionary:screeningJSON
                                                            error:&error];
            if (error) {
                NSLog(@"Error parsing screening data: %@", error);
                *stop = YES;
            } else {
                [screenings addObject:screening];
            }
        }];
        return screenings;
    }];
}

@end

@implementation KOScreening

+ (NSDictionary *)JSONKeyPathsByPropertyKey {
    return @{@"time": @"date",
             @"cinema": @"cinema"};
}

+ (NSValueTransformer *)timeJSONTransformer {
    return [MTLValueTransformer transformerWithBlock:^(NSString *RFC3339) {
        NSString *RFC3339Format = @"yyyy-MM-ddThh:mm:SSZZZZZ";
        NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
        formatter.dateFormat = RFC3339Format;
        return [formatter dateFromString:RFC3339];
    }];
}

@end
