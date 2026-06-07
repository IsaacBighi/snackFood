import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;

  margin: 10px;
  padding: 14px;

  border-radius: 14px;

  elevation: 6;

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageBox = styled.View`
  width: 80px;
  height: 80px;

  border-radius: 12px;

  overflow: hidden;

  margin-right: 12px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: ${({ theme }) => theme.colors.text};
`;

export const Category = styled.Text`
  font-size: 13px;

  color: #666;

  margin-top: 4px;
`;

export const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: ${({ theme }) => theme.colors.primary};

  margin-top: 6px;
`;

export const Actions = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin-top: 16px;
`;

export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Quantity = styled.Text`
  min-width: 40px;

  text-align: center;

  font-size: 18px;
  font-weight: bold;

  color: ${({ theme }) => theme.colors.text};
`;

export const ActionButton = styled.Pressable`
  width: 36px;
  height: 36px;

  border-radius: 18px;

  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: center;
`;

export const RemoveButton = styled.Pressable`
  width: 40px;
  height: 40px;

  border-radius: 20px;

  background-color: #ffe5e5;

  align-items: center;
  justify-content: center;
`;
