//
//  KOAPIClient.h
//  KinoApp
//
//  Created by Milan Cermak on 7. 10. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

@interface KOAPIClient : NSObject

+ (instancetype)sharedClient;

- (void)getShowtimes;

@end
