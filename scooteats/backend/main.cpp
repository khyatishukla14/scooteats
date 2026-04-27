#include <algorithm>
#include <iomanip>
#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

using namespace std;

enum class FoodType { Veg, NonVeg };

string foodTypeToString(FoodType type) {
  return (type == FoodType::Veg) ? "Veg" : "Non-Veg";
}

class MenuItem {
 private:
  int id_;
  string name_;
  double price_;
  FoodType type_;

 public:
  MenuItem(int id, string name, double price, FoodType type)
      : id_(id), name_(std::move(name)), price_(price), type_(type) {}

  int id() const { return id_; }
  const string& name() const { return name_; }
  double price() const { return price_; }
  FoodType type() const { return type_; }
};

class Restaurant {
 private:
  string name_;
  string cuisine_;
  vector<MenuItem> menu_;

 public:
  Restaurant(string name, string cuisine)
      : name_(std::move(name)), cuisine_(std::move(cuisine)) {}

  void addItem(const MenuItem& item) { menu_.push_back(item); }
  const vector<MenuItem>& menu() const { return menu_; }
  const string& name() const { return name_; }
  const string& cuisine() const { return cuisine_; }
};

class User {
 protected:
  int id_;
  string name_;

 public:
  User(int id, string name) : id_(id), name_(std::move(name)) {}
  virtual ~User() = default;
  virtual string role() const = 0;  // Abstraction + polymorphism
  const string& name() const { return name_; }
};

class Customer : public User {
 public:
  Customer(int id, const string& name) : User(id, name) {}
  string role() const override { return "Customer"; }
};

class RestaurantOwner : public User {
 public:
  RestaurantOwner(int id, const string& name) : User(id, name) {}
  string role() const override { return "Restaurant Owner"; }
};

class DeliveryPartner : public User {
 public:
  DeliveryPartner(int id, const string& name) : User(id, name) {}
  string role() const override { return "Delivery Partner"; }
};

class PromoCode {
 protected:
  string code_;

 public:
  explicit PromoCode(string code) : code_(std::move(code)) {}
  virtual ~PromoCode() = default;
  virtual double discount(double subtotal) const = 0;
  string code() const { return code_; }
};

class FlatDiscountPromo : public PromoCode {
 private:
  double amount_;

 public:
  FlatDiscountPromo(string code, double amount)
      : PromoCode(std::move(code)), amount_(amount) {}

  double discount(double subtotal) const override { return min(subtotal, amount_); }
};

class PercentageDiscountPromo : public PromoCode {
 private:
  double percentage_;

 public:
  PercentageDiscountPromo(string code, double percentage)
      : PromoCode(std::move(code)), percentage_(percentage) {}

  double discount(double subtotal) const override { return subtotal * (percentage_ / 100.0); }
};

class Cart {
 private:
  vector<MenuItem> items_;

 public:
  void addItem(const MenuItem& item) { items_.push_back(item); }

  double subtotal() const {
    double total = 0.0;
    for (const auto& item : items_) total += item.price();
    return total;
  }

  const vector<MenuItem>& items() const { return items_; }
  bool empty() const { return items_.empty(); }
  void clear() { items_.clear(); }
};

int main() {
  Restaurant indian("Spice Symphony", "Indian");
  indian.addItem(MenuItem(101, "Paneer Tikka", 220, FoodType::Veg));
  indian.addItem(MenuItem(102, "Butter Chicken", 280, FoodType::NonVeg));

  Restaurant chinese("Dragon Bowl", "Chinese");
  chinese.addItem(MenuItem(201, "Veg Hakka Noodles", 180, FoodType::Veg));
  chinese.addItem(MenuItem(202, "Chilli Chicken", 250, FoodType::NonVeg));

  vector<Restaurant> restaurants = {indian, chinese};

  Customer customer(1, "Aarav");
  RestaurantOwner owner(2, "Meera");
  DeliveryPartner partner(3, "Karan");
  vector<shared_ptr<User>> users = {
      make_shared<Customer>(customer),
      make_shared<RestaurantOwner>(owner),
      make_shared<DeliveryPartner>(partner)};

  cout << "Roles in system:\n";
  for (const auto& user : users) {
    cout << " - " << user->name() << " [" << user->role() << "]\n";
  }

  cout << "\nAvailable restaurants and menus:\n";
  for (const auto& restaurant : restaurants) {
    cout << restaurant.name() << " (" << restaurant.cuisine() << ")\n";
    for (const auto& item : restaurant.menu()) {
      cout << "  * " << item.name() << " - Rs. " << item.price()
           << " [" << foodTypeToString(item.type()) << "]\n";
    }
  }

  Cart cart;
  cart.addItem(restaurants[0].menu()[0]);
  cart.addItem(restaurants[1].menu()[1]);

  unordered_map<string, shared_ptr<PromoCode>> promos;
  promos["SAVE100"] = make_shared<FlatDiscountPromo>("SAVE100", 100);
  promos["FEAST20"] = make_shared<PercentageDiscountPromo>("FEAST20", 20);

  const string selectedPromo = "FEAST20";
  double subtotal = cart.subtotal();
  double discount = promos[selectedPromo]->discount(subtotal);
  double finalTotal = max(0.0, subtotal - discount);

  cout << fixed << setprecision(2);
  cout << "\nCart subtotal: Rs. " << subtotal << '\n';
  cout << "Promo applied (" << selectedPromo << "): Rs. " << discount << '\n';
  cout << "Final payable amount: Rs. " << finalTotal << '\n';

  vector<string> trackingStatus = {"Order placed", "Preparing", "Picked up", "Out for delivery", "Delivered"};
  cout << "\nOrder tracking simulation:\n";
  for (const auto& status : trackingStatus) cout << " - " << status << '\n';

  cout << "\nFeedback: 5/5 - Fast delivery and excellent food quality.\n";
  return 0;
}
