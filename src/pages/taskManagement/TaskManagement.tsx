import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { ReactChild } from 'react';
import React from 'react';

export default function TaskManagement(props: { children: ReactChild }) {
  return (
    <div>
      <PageHeaderWrapper>{props.children}</PageHeaderWrapper>
    </div>
  );
}
