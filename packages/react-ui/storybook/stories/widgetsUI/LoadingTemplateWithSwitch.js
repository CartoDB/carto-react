import React, { useState } from 'react';
import { Label, ThinContainer } from '../../utils/storyStyles';

/**
 * Create template for testing loading/loaded state layoyut.
 *
 * Target is to have same size of widget and position of components in loaded/loading(skeleton).
 *
 * @param {*} Component component to be tested
 * @returns Template
 */
const LoadingTemplateWithSwitch = (Component) => (args) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(args.isLoading);
  return (
    <>
      <button onClick={() => setIsLoading(!isLoading)}>toggle loading</button>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <Component {...args} isLoading={isLoading} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <Component {...args} isLoading={isLoading} />
    </>
  );
};

export default LoadingTemplateWithSwitch;
