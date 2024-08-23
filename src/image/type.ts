/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, ImageEvent } from '../common';

export interface TdImageProps {
  /**
   * 图片描述
   * @default ''
   */
  alt?: string;
  /**
   * 自定义图片加载失败状态下的显示内容
   */
  error?: TNode;
  /**
   * 图片加载失败时，显示当前链接设置的图片地址。如果要使用组件图标或完全自定义加载失败时显示的内容，请更为使用 `error`
   * @default ''
   */
  fallback?: string;
  /**
   * 图片填充模式
   * @default fill
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * 是否开启图片懒加载
   * @default false
   */
  lazy?: boolean;
  /**
   * 自定义加载中状态的图片内容，如：“加载中”
   */
  loading?: TNode;
  /**
   * 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何单位，px 或者 百分比
   * @default center
   */
  position?: string;
  /**
   * `<img>` 标签的原生属性，[MDN 定义](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
   */
  referrerpolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';
  /**
   * 图片圆角类型
   * @default square
   */
  shape?: 'circle' | 'round' | 'square';
  /**
   * 图片链接
   * @default ''
   */
  src?: string;
  /**
   * 图片链接集合，用于支持特殊格式的图片，如 `.avif` 和 `.webp`。会优先加载 `srcset` 中的图片格式，浏览器不支持的情况下，加载 `src` 设置的图片地址
   */
  srcset?: ImageSrcset;
  /**
   * 图片加载失败时触发
   */
  onError?: (context: { e: ImageEvent<HTMLImageElement> }) => void;
  /**
   * 图片加载完成时触发
   */
  onLoad?: (context: { e: ImageEvent<HTMLImageElement> }) => void;
}

export interface ImageSrcset {
  'image/avif': string;
  'image/webp': string;
}
