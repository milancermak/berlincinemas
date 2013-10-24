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

+ (NSDictionary *)JSONKeyPathsByPropertyKey {
    return @{@"cinema": @"cinema",
             @"date": @"date",
             @"title": @"title"};
}

+ (NSValueTransformer *)dateJSONTransformer {
    return [MTLValueTransformer transformerWithBlock:^(NSString *RFC3339) {
        NSString *RFC3339Format = @"yyyy-MM-dd'T'HH:mm:ssZ";
        // TODO: cache this date formatter
        NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
        [formatter setDateFormat:RFC3339Format];
        return [formatter dateFromString:RFC3339];
    }];
}

@end
