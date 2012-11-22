class DeadlineValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    type = get_type(record)
    if type.blank?
      record.errors[:type] << (options[:message] || 'invalid type')
    else
      record.errors[attribute] << (options[:message] || "deadline_hour is required") if value.blank? || value[:deadline_hour].blank?
      record.errors[attribute] << (options[:message] || "deadline_minute is required") if value.blank? || value[:deadline_minute].blank?

      case type.to_sym
      when :weekly, :monthly
        record.errors[attribute] << (options[:message] || "deadline_day is required in a #{type} plan") if value.blank? || value[:deadline_day].blank?
      when :quarterly, :yearly
        record.errors[attribute] << (options[:message] || "deadline_month is required in a #{type} plan") if value.blank? || value[:deadline_month].blank?
        record.errors[attribute] << (options[:message] || "deadline_day is required in a #{type} plan") if value.blank? || value[:deadline_day].blank?
      else
        record.errors[attribute] << (options[:message] || "invalid type!") unless type.to_sym == :daily
      end
    end
  end

  def get_type(record)
    return record.type if record.respond_to?(:type)

    record.send("#{record.class.name.demodulize.underscore}_type")
  end
end
