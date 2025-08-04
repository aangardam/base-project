/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TreeView, { flattenTree } from 'react-accessible-treeview';
import { FaCheckSquare, FaMinusSquare, FaSquare } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';

const ArrowIcon: React.FC<{ isOpen?: boolean; className?: string }> = ({
    isOpen,
    className,
}) => (
    <IoMdArrowDropright
        className={`cursor-pointer text-2xl ${
            isOpen ? 'rotate-90 duration-300 ease-in-out' : ''
        } ${className || ''}`}
    />
);

const CheckBoxIcon: React.FC<{
    className?: string;
    onClick?: () => void;
    variant?: 'all' | 'none' | 'some';
}> = ({ variant, className, ...rest }) => {
    switch (variant) {
        case 'all':
            return <FaCheckSquare className={className} {...rest} />;
        case 'none':
            return <FaSquare className={className} {...rest} />;
        case 'some':
            return <FaMinusSquare className={className} {...rest} />;
        default:
            return null;
    }
};

type TreeNodeProps = {
    element: any;
    isBranch: boolean;
    isExpanded: boolean;
    isSelected: boolean;
    isHalfSelected: boolean;
    getNodeProps: any;
    level: number;
    handleSelect: any;
    handleExpand: any;
    isDisabled: boolean; // Add isDisabled prop
};

const TreeNode = ({
    element,
    isBranch,
    isExpanded,
    isHalfSelected,
    getNodeProps,
    level,
    handleSelect,
    handleExpand,
    isSelected,
    isDisabled, // Add isDisabled prop
}: TreeNodeProps) => (
    <div
        {...getNodeProps({ onClick: handleExpand })}
        style={{
            marginLeft: 30 * (level - 1),
            cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        className={`flex gap-2 items-center relative ${
            isDisabled ? 'opacity-50' : ''
        }`}
    >
        {isBranch && (
            <ArrowIcon isOpen={isExpanded} className="absolute -left-[28px]" />
        )}
        {!isBranch && element.parent !== 0 && (
            <>
                <span className="h-full absolute -left-4 -top-3 border-b-2 w-2 border-black"></span>
                <span className="h-full absolute border border-l-1 -left-[18px] border-black"></span>
            </>
        )}
        <CheckBoxIcon
            className={`text-xl ${
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={isDisabled ? undefined : handleSelect}
            variant={isHalfSelected ? 'some' : isSelected ? 'all' : 'none'}
        />
        <span
            className={`text-lg ${
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
        >
            {element.name}
        </span>
    </div>
);

type MultiSelectCheckboxProps = {
    options: any;
    value: any[];
    onChange: (value: any) => void;
    disabledIds?: any[]; // Add disabledIds prop
};


export default function MultiSelectCheckbox({
    options,
    value,
    onChange,
    disabledIds = [], // Default disabledIds to an empty array
}: MultiSelectCheckboxProps) {
    const flattenedTree = flattenTree(options);
    const defaultExpandedIds = flattenedTree.map((node) => node.id);
    // console.log('flattenedTree', flattenedTree)
    return (
        <div>
            <div className="checkbox">
                <TreeView
                    data={flattenedTree}
                    aria-label="Checkbox tree"
                    multiSelect
                    propagateSelect
                    propagateCollapse
                    defaultDisabledIds={disabledIds}
                    togglableSelect
                    // selectedIds={value}
                    defaultSelectedIds={value}
                    defaultExpandedIds={defaultExpandedIds}
                    onSelect={(selectedNew) => {
                        onChange(Array.from(selectedNew.treeState.selectedIds));
                    }}
                    nodeRenderer={(props) => (
                        <TreeNode
                            {...props}
                            isDisabled={disabledIds.includes(props.element.id)}
                        />
                    )}
                />
            </div>
        </div>
    );
}

export function TreeViewData({ options }: any) {
    return (
        <div>
            <TreeView data={flattenTree(options)} nodeRenderer={TreeNode} />
        </div>
    );
}
