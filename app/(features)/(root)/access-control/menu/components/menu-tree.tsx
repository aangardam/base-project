import React from 'react';
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import useMenuTree from '@/app/(features)/(root)/access-control/menu/hooks/use-menu-tree';
import { 
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent, 
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { TMenuTree } from '../interfaces/menu';

import { toast } from '@/shared/hooks/use-toast';


const MinimalTreeItemComponent = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<TMenuTree>
>((props, ref) => (
  <SimpleTreeItemWrapper {...props} ref={ref} className="w-[600px]">
    <div>{props.item.name}</div>
  </SimpleTreeItemWrapper>
));

MinimalTreeItemComponent.displayName = 'MinimalTreeItemComponent';

export const MenuTree = () => {
  const { 
    disableSubmit,
    setDisableSubmit,
    menuItems,
    setMenuItems,
    hasDepthGreaterThan,
    handleSubmit,
    isMovingToDifferentParent,
    prevMenuItems,
    setPrevMenuItems
  } = useMenuTree();
  
  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="1">
            <AccordionTrigger>
                Tree Menu
            </AccordionTrigger>
            <AccordionContent>
                <div>
                    <div className="relative w-full">
                        <div className="flex gap-10">
                        {menuItems.length > 0 && (
                            <div>
                              <SortableTree
                                  items={menuItems}
                                  onItemsChanged={(newItems) => {
                                    
                                    if (hasDepthGreaterThan(newItems, 3)) {
                                        console.warn('Max depth exceeded');
                                        return;
                                    }else{
                                      setDisableSubmit(false);
                                    }

                                    if (isMovingToDifferentParent(prevMenuItems, newItems)) {
                                      toast({
                                        title: 'Error',
                                        description: "Cannot move item to different parent.",
                                        variant: 'destructive',
                                      });
                                      console.warn("Cannot move item to different parent.");
                                      return;
                                    }
                                    setMenuItems(newItems);
                                    setPrevMenuItems(newItems);
                                  }}
                                  TreeItemComponent={MinimalTreeItemComponent}
                              />
                            </div>
                        )}
                        </div>
                    </div>
                </div>
                <div className='mt-2 mr-8 justify-end flex'>
                    <Button
                        variant="primaryGradient"
                        type="button"
                        onClick={handleSubmit}
                        className="px-6"
                        disabled={disableSubmit}
                    >
                        Update Menu
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
};
