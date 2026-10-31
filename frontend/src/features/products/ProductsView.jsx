import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { productService } from './services/productService';
import { Package, Plus } from 'lucide-react';

export const ProductsView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  return (
    <div>
      <PageHeader
        title="Products Management"
        description="Manage Brightloop's core software offerings, add-ons, and pricing variants."
        badge="Dev 2 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>New Product</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {products.map((p) => (
          <Card key={p.id} title={p.name} subtitle={`SKU: ${p.sku}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <StatusBadge status={p.is_active ? 'ACTIVE' : 'PAUSED'} label={p.is_active ? 'Active' : 'Archived'} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {p.variants_count || 1} Variants
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
