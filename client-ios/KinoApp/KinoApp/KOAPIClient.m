//
//  KOAPIClient.m
//  KinoApp
//
//  Created by Milan Cermak on 7. 10. 2013.
//  Copyright (c) 2013 Milan Cermak. All rights reserved.
//

#import "AFNetworking/AFNetworking.h"
#import "KOAPIClient.h"

static NSString *const KOAPIBaseURL = @"http://192.168.1.8:5000";

@interface KOAPIClient ()

@property (nonatomic, strong) AFHTTPSessionManager *HTTPWorker;

@end

@implementation KOAPIClient

+ (instancetype)sharedClient {
    static KOAPIClient *instance;
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        instance = [KOAPIClient new];
    });
    return instance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        NSURL *baseURL = [NSURL URLWithString:KOAPIBaseURL];
        self.HTTPWorker = [[AFHTTPSessionManager alloc] initWithBaseURL:baseURL];
    }
    return self;
}

- (void)getShowtimes {
    [self.HTTPWorker GET:@"/cinemas"
              parameters:nil
                 success:^(NSURLSessionDataTask *task , id responseObject) {
        NSLog(@"Got showtimes: %@", responseObject);
        NSLog(@"Response: %@", task.response);
    }
                 failure:^(NSURLSessionDataTask *task , NSError *error) {
        NSLog(@"Error retrieving showtimes: %@", error);
    }];
}

@end
