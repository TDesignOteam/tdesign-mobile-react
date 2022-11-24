:: BASE_DOC ::

## API

### BackTop Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
fixed | Boolean | true | 是否绝对定位固定到屏幕右下方 | N
icon | TNode | 'backtop' | 图标。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
target | Object | () => window | 定位滚动到指定对象。TS 类型：`() => HTMLElement` | N
text | String | '' | 文案 | N
theme | String | round | 预设的样式类型。可选项：round/half-round/round-dark/half-round-dark | N
