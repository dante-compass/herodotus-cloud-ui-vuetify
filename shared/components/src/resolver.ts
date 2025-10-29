import type { ComponentResolver } from 'unplugin-vue-components';

/**
 * Herodotus UI 组件解析器
 */
export function HerodotusResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      // 只处理指定前缀的组件
      if (name.startsWith('H')) {
        const componentName = name;
        const from = '@herodotus/components';

        // 构建 side effects 配置
        const sideEffects: string[] = ['@herodotus/components/style.css'];

        return {
          name: componentName,
          from,
          sideEffects: sideEffects.length > 0 ? sideEffects : undefined,
        };
      }
    },
  };
}

export default HerodotusResolver;
