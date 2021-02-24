import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { ReactChild } from 'react';
import React from 'react';

export default function locationManagement(props: { children: ReactChild }) {
  return <PageHeaderWrapper>{props.children}</PageHeaderWrapper>;
}
