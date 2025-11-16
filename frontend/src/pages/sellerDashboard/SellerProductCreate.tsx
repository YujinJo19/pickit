import React, { useState } from "react";
import { ProductCreateRequest } from "../../types/products";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createProduct } from "../../store/thunks/productThunk";

const SellerProductCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductCreateRequest>({
    name: "",
    price: 0,
    discountPrice: 0,
    description: "",
    categoryId: 0,
    images: [],
    inventory: [{ color: "", size: "", quantity: 0 }],
  });

  // 이미지 파일 처리
  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  // 일반 input 변경 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 인벤토리 변경
  const handleInventoryChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newInventory = [...form.inventory];
    newInventory[index] = { ...newInventory[index], [field]: value };
    setForm({ ...form, inventory: newInventory });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(form);
      alert("상품이 등록되었습니다!");
      navigate("/seller/products");
    } catch (err) {
      console.error(err);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>상품 등록</Title>
      <form onSubmit={handleSubmit}>
        <Label>상품명</Label>
        <Input name="name" value={form.name} onChange={handleChange} required />

        <Label>가격</Label>
        <Input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />

        <Label>할인 가격</Label>
        <Input
          name="discountPrice"
          type="number"
          value={form.discountPrice}
          onChange={handleChange}
        />

        <Label>카테고리 ID</Label>
        <Input
          name="categoryId"
          type="number"
          value={form.categoryId}
          onChange={handleChange}
        />

        <Label>설명</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Label>상품 이미지</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <Label>재고</Label>
        {form.inventory.map((item, index) => (
          <InventoryRow key={index}>
            <Input
              placeholder="색상"
              value={item.color}
              onChange={(e) =>
                handleInventoryChange(index, "color", e.target.value)
              }
            />
            <Input
              placeholder="사이즈"
              value={item.size}
              onChange={(e) =>
                handleInventoryChange(index, "size", e.target.value)
              }
            />
            <Input
              placeholder="수량"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleInventoryChange(index, "quantity", Number(e.target.value))
              }
            />
          </InventoryRow>
        ))}

        <SubmitButton type="submit">등록하기</SubmitButton>
      </form>
    </Container>
  );
};

export default SellerProductCreate;

// --------------------- styled ---------------------

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
`;

const InventoryRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #457b9d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #1d3557;
  }
`;
