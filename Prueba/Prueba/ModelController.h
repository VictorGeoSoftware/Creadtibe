//
//  ModelController.h
//  Prueba
//
//  Created by Victor Palma Carrasco on 12/12/14.
//  Copyright (c) 2014 Victor Palma Carrasco. All rights reserved.
//

#import <UIKit/UIKit.h>

@class DataViewController;

@interface ModelController : NSObject <UIPageViewControllerDataSource>

- (DataViewController *)viewControllerAtIndex:(NSUInteger)index storyboard:(UIStoryboard *)storyboard;
- (NSUInteger)indexOfViewController:(DataViewController *)viewController;

@end

