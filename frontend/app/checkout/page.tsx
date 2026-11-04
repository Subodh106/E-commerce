
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type Address = {
  country: string;
  city: string;
  street: string;
  phone_number: string;
};

type CheckoutForm = {
  shipping_address: Address;
  billing_address: Address;
  payment_type: "CARD" | "CASH_ON_DELIVERY";
};

const emptyAddress: Address = {
  country: "",
  city: "",
  street: "",
  phone_number: "",
};

// Replace these sample items with your real cart context data.
const cartItems = [
  { id: 1, name: "Everyday Sneakers", price: 3500, quantity: 1 },
  { id: 2, name: "Classic T-Shirt", price: 1200, quantity: 2 },
];

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CheckoutPage() {
  const router = useRouter();

  const [shipping, setShipping] = useState<Address>({ ...emptyAddress });
  const [billing, setBilling] = useState<Address>({ ...emptyAddress });
  const [sameBilling, setSameBilling] = useState(true);
  const [paymentType, setPaymentType] =
    useState<CheckoutForm["payment_type"]>("CASH_ON_DELIVERY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + shippingFee;

  const updateAddress = (
    type: "shipping" | "billing",
    field: keyof Address,
    value: string
  ) => {
    if (type === "shipping") {
      setShipping((prev) => ({ ...prev, [field]: value }));
    } else {
      setBilling((prev) => ({ ...prev, [field]: value }));
    }
  };

  const renderAddressFields = (
    type: "shipping" | "billing",
    address: Address
  ) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor={`${type}-country`}>Country</Label>
        <Input
          id={`${type}-country`}
          placeholder="e.g. Nepal"
          autoComplete="country-name"
          value={address.country}
          onChange={(e) => updateAddress(type, "country", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-city`}>City</Label>
        <Input
          id={`${type}-city`}
          placeholder="e.g. Pokhara"
          autoComplete="address-level2"
          value={address.city}
          onChange={(e) => updateAddress(type, "city", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={`${type}-street`}>Street address</Label>
        <Input
          id={`${type}-street`}
          placeholder="House number, street, area"
          autoComplete="street-address"
          value={address.street}
          onChange={(e) => updateAddress(type, "street", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={`${type}-phone`}>Phone number</Label>
        <Input
          id={`${type}-phone`}
          type="tel"
          placeholder="+977 98XXXXXXXX"
          autoComplete="tel"
          value={address.phone_number}
          onChange={(e) =>
            updateAddress(type, "phone_number", e.target.value)
          }
          required
        />
      </div>
    </div>
  );

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    const payload: CheckoutForm = {
      shipping_address: shipping,
      billing_address: sameBilling ? { ...shipping } : billing,
      payment_type: paymentType,
    };

    try {
      // Adapt the endpoint and response handling to your Spring Boot API.
      const response = await api.post("/orders", payload);

      // Prefer the order ID returned by your backend.
      const orderId = response.data?.data?.id ?? response.data?.id;

      if (orderId) {
        router.push(`/orders/${orderId}`);
      } else {
        router.push("/orders");
      }
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Unable to place your order. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-8 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Your order, your way
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Checkout
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Confirm your delivery details and choose how you want to pay.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Checkout form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Shipping address */}
              <Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <MapPin className="h-4 w-4" />
                    </span>
                    Shipping address
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Where should we deliver your order?
                  </p>
                </CardHeader>
                <CardContent>
                  {renderAddressFields("shipping", shipping)}
                </CardContent>
              </Card>

              {/* Billing address */}
              <Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Package className="h-4 w-4" />
                    </span>
                    Billing address
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your billing details for this purchase.
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="same-billing"
                      checked={sameBilling}
                      onCheckedChange={(checked:boolean) =>
                        setSameBilling(checked === true)
                      }
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="same-billing"
                        className="cursor-pointer font-medium"
                      >
                        Same as shipping address
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Use your delivery details for billing.
                      </p>
                    </div>
                  </div>

                  {!sameBilling && renderAddressFields("billing", billing)}
                </CardContent>
              </Card>

              {/* Payment method */}
              <Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="text-lg">Payment method</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Choose your preferred payment option.
                  </p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentType}
                    onValueChange={(value:any) =>
                      setPaymentType(value as CheckoutForm["payment_type"])
                    }
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <Label
                      htmlFor="cod"
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                        paymentType === "CASH_ON_DELIVERY"
                          ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900 dark:border-white dark:bg-slate-800 dark:ring-white"
                          : "border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500"
                      }`}
                    >
                      <RadioGroupItem
                        value="CASH_ON_DELIVERY"
                        id="cod"
                        className="mt-1"
                      />
                      <Wallet className="mt-0.5 h-5 w-5 shrink-0" />
                      <div className="space-y-1">
                        <p className="font-semibold">Cash on delivery</p>
                        <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
                          Pay when your order arrives.
                        </p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="card"
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                        paymentType === "CARD"
                          ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900 dark:border-white dark:bg-slate-800 dark:ring-white"
                          : "border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500"
                      }`}
                    >
                      <RadioGroupItem value="CARD" id="card" className="mt-1" />
                      <CreditCard className="mt-0.5 h-5 w-5 shrink-0" />
                      <div className="space-y-1">
                        <p className="font-semibold">Credit / debit card</p>
                        <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
                          Pay securely through a payment provider.
                        </p>
                      </div>
                    </Label>
                  </RadioGroup>

                  {paymentType === "CARD" && (
                    <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      Card payments require a payment gateway integration.
                      Selecting card here does not process a payment.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order summary */}
            <aside className="lg:sticky lg:top-6">
              <Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="text-lg">Order summary</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {cartItems.length} product types in your order
                  </p>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0 space-y-1">
                          <p className="truncate text-sm font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500 dark:text-slate-400">
                        Subtotal
                      </span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500 dark:text-slate-400">
                        Shipping
                      </span>
                      <span>
                        {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold tracking-tight">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading || cartItems.length === 0}
                    className="h-12 w-full bg-slate-950 font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    {loading ? "Placing order..." : "Place order"}
                  </Button>

                  <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    Your order will be confirmed after the server validates it.
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Truck className="h-4 w-4" />
                    Free shipping on orders over NPR 5,000
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
