import { ContentfulCollection, ContentTypeCollection, LocaleCollection } from "contentful";
export interface ContentfulEnvironment {
    getContentTypes(options: {
        limit: number;
    }): Promise<ContentfulCollection<unknown>>;
    getLocales(): Promise<ContentfulCollection<unknown>>;
}
export declare type EnvironmentGetter = () => Promise<ContentfulEnvironment>;
export declare function loadEnvironment(): Promise<{
    contentTypes: ContentTypeCollection;
    locales: LocaleCollection;
}>;
