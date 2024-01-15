import React, { useState, useEffect } from 'react';
import './index.less';
import cls from 'classnames';
interface PropsType {
  defaultSize: number;
  sizeChangeFunc: (value: number) => void;
}

const defaultSizes = [
  { label: '自适应', value: 0 },
  { label: '200%', value: 2 },
  { label: '100%', value: 1 },
  { label: '75%', value: 0.75 },
  { label: '50%', value: 0.5 },
];

export const SizeList = (props: PropsType) => {
  const { defaultSize, sizeChangeFunc } = props;

  const [size, setSize] = useState({ label: '自适应', value: 0 });
  const [showMenu, setShowMenu] = useState(false);

  const handleClickBtn = (type: string) => {
    if (type === 'mini' && size.value == 0.5) {
      return;
    }

    const currentValue = size.value === 0 ? 1 : size.value;

    const newValue =
      type === 'mini'
        ? Number((currentValue - 0.1).toFixed(1))
        : Number((currentValue + 0.1).toFixed(1));
    const newLabel = parseInt(`${newValue * 100}`);

    setSize({
      label: `${newLabel}%`,
      value: newValue,
    });

    sizeChangeFunc(newValue);
  };

  // 菜单项点击
  const handleClickMenItem = (item: { label: string; value: number }) => {
    setSize({ ...item });
    setShowMenu(false);
    props.sizeChangeFunc(item.value);
  };

  // 菜单切换
  const triggerSizeMenu = (e: any) => {
    const outerModule = document.querySelector(
      '.layout-right__preview-toolbar__size-list__menu'
    );

    if (outerModule && !outerModule.contains(e.target as Node) && showMenu) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', triggerSizeMenu, false);

    return () => {
      document.removeEventListener('click', triggerSizeMenu, false);
    };
  }, [showMenu]);

  useEffect(() => {
    const newSize = defaultSizes.find((item) => item.value == defaultSize);

    newSize && setSize(newSize);
  }, [defaultSize]);

  return (
    <div className="layout-right__preview-toolbar__size">
      <div
        className="layout-right__preview-toolbar__size-mini"
        onClick={() => handleClickBtn('mini')}
      >
        <i></i>
      </div>
      <div className="layout-right__preview-toolbar__size-list">
        <div
          className={cls(
            'layout-right__preview-toolbar__size-list__value',
            showMenu && 'show'
          )}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div>{size.label}</div>
          <i></i>
        </div>

        <ul
          className={cls(
            'layout-right__preview-toolbar__size-list__menu',
            showMenu && 'show'
          )}
        >
          {defaultSizes.map((item) => {
            return (
              <li
                className="layout-right__preview-toolbar__size-list__menu-item"
                key={item.value}
                onClick={() => handleClickMenItem(item)}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="layout-right__preview-toolbar__size-plus"
        onClick={() => handleClickBtn('plus')}
      >
        <i></i>
      </div>
    </div>
  );
};
