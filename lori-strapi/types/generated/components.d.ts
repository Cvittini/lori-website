import type { Schema, Struct } from '@strapi/strapi';

export interface PacksShopPackOption extends Struct.ComponentSchema {
  collectionName: 'components_packs_shop_pack_options';
  info: {
    displayName: 'shop.pack.Option';
  };
  attributes: {};
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {};
}

export interface SeoSharedComponent extends Struct.ComponentSchema {
  collectionName: 'components_seo_shared_components';
  info: {
    displayName: 'shared.component';
  };
  attributes: {};
}

export interface SeoSharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_shared_seos';
  info: {
    displayName: 'shared.seo';
  };
  attributes: {};
}

export interface VideoMediaVideo extends Struct.ComponentSchema {
  collectionName: 'components_video_media_videos';
  info: {
    displayName: 'media.video';
    icon: 'play';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'packs.shop-pack-option': PacksShopPackOption;
      'seo.seo': SeoSeo;
      'seo.shared-component': SeoSharedComponent;
      'seo.shared-seo': SeoSharedSeo;
      'video.media-video': VideoMediaVideo;
    }
  }
}
