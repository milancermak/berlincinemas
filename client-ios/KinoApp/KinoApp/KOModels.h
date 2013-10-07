//
//  KOModels.h
//  KinoApp
//
//  Created by Milan Cermak on 25. 9. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import <CoreLocation/CoreLocation.h>
#import "Mantle/Mantle.h"

@interface KOCinema : MTLModel <MTLJSONSerializing>

@property (nonatomic, copy, readonly) CLLocation *location;
@property (nonatomic, copy, readonly) NSString *name;

@end

@interface KOMovie : MTLModel <MTLJSONSerializing>

@property (nonatomic, copy, readonly) NSString *title;
@property (nonatomic, copy, readonly) NSArray *screenings;

@end

@interface KOScreening : MTLModel <MTLJSONSerializing>

@property (nonatomic, copy, readonly) NSDate *date;
@property (nonatomic, strong, readonly) KOCinema *cinema;

@end
