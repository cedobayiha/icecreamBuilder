import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IcecreamBuilder } from './IcecreamBuilder';
import Controls from '../../Components/IceCream/Controls/Controls';


configure({ adapter: new Adapter() });

describe('<IcecreamBuilder />', () => {
  let contain;
  beforeEach(() => {
    contain = shallow(<IcecreamBuilder onInitIngredients={() => { }} />);
  });
  it('should render building Controls when receiving ingredients', () => {
    contain.setProps({ ings: { vanilla: 0 } });
    expect(contain.find(Controls)).toHaveLength(1);
  });
})