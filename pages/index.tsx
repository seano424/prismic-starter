import Head from 'next/head'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { Content } from '@prismicio/client'

import { SliceZone } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

import { createClient } from '../prismicio'
import { components } from '../slices'
import { Layout } from '../components/Layout'

const Index = ({
  page,
  navigation,
  settings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      alternateLanguages={page.alternate_languages}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  )
}

export default Index

export async function getStaticProps({
  locale,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData })

  const page = await client.getByUID<Content.PageDocument>('page', 'home', {
    lang: locale,
  })
  const navigation = await client.getSingle<Content.NavigationDocument>(
    'navigation',
    { lang: locale }
  )
  const settings = await client.getSingle<Content.SettingsDocument>(
    'settings',
    { lang: locale }
  )

  return {
    props: {
      page,
      navigation,
      settings,
    },
  }
}
